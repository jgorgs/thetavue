// Add a debug endpoint to check Supabase connection

import { createClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = createClient();
    
    // Test the connection by trying to fetch the current timestamp
    const { data, error } = await supabase
      .from('users')
      .select('count(*)')
      .single();

    if (error) {
      console.error('Supabase connection error:', error);
      return NextResponse.json({ 
        success: false, 
        error: error.message,
        details: {
          code: error.code,
          hint: error.hint,
          details: error.details
        }
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Supabase connection successful',
      data 
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

