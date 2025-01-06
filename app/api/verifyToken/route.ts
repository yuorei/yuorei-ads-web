import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
// import admin from 'firebase-admin';

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//     }),
//   });
// }

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    return NextResponse.json({ uid: decodedToken.uid });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
