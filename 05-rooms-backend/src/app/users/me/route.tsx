import UserRepository from '@/repositories/UserRepository';
import {NextResponse} from 'next/server';

export function GET() {
  return NextResponse.json(UserRepository.getMe());
}
