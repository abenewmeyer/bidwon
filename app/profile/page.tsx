'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    company_name: '',
    uei: '',
    naics_codes: [] as string[],
    set_asides: [] as string[],
  });

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (data) setProfile(data);
      setLoading(false);
    };
    loadProfile();
  }, [router]);

  const saveProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('company_profiles')
      .upsert({
        user_id: user.id,
        ...profile,
        naics_codes: profile.naics_codes,
        set_asides: profile.set_asides,
      });

    if (!error) {
      alert('Profile saved! Redirecting to dashboard...');
      router.push('/dashboard');
    } else {
      alert('Error saving profile');
    }
  };

  if (loading) return <div className="p-12 text-center text-white">Loading profile...</div>;

  return (
    <div className="max-w-2xl mx-auto p-8 text-white">
      <h1 className="text-4xl font-bold mb-10">Company Profile Setup</h1>
      <div className="space-y-8">
        <div>
          <label className="block mb-2 font-medium">Company Name</label>
          <input type="text" value={profile.company_name} onChange={(e) => setProfile({...profile, company_name: e.target.value})} className="w-full p-4 bg-slate-800 border border-slate-700 rounded-2xl" />
        </div>
        <div>
          <label className="block mb-2 font-medium">UEI Number</label>
          <input type="text" value={profile.uei} onChange={(e) => setProfile({...profile, uei: e.target.value})} className="w-full p-4 bg-slate-800 border border-slate-700 rounded-2xl" />
        </div>
        <div>
          <label className="block mb-2 font-medium">NAICS Codes (comma separated)</label>
          <input type="text" value={profile.naics_codes.join(', ')} onChange={(e) => setProfile({...profile, naics_codes: e.target.value.split(',').map(s => s.trim())})} className="w-full p-4 bg-slate-800 border border-slate-700 rounded-2xl" placeholder="624230, 236220, 541330" />
        </div>
        <div>
          <label className="block mb-2 font-medium">Set-Asides (comma separated)</label>
          <input type="text" value={profile.set_asides.join(', ')} onChange={(e) => setProfile({...profile, set_asides: e.target.value.split(',').map(s => s.trim())})} className="w-full p-4 bg-slate-800 border border-slate-700 rounded-2xl" placeholder="SDVOSBC, HUBZone" />
        </div>
        <button onClick={saveProfile} className="w-full bg-emerald-600 hover:bg-emerald-700 py-5 rounded-3xl font-semibold text-xl">
          Save Profile & Enable Scanning
        </button>
      </div>
    </div>
  );
}