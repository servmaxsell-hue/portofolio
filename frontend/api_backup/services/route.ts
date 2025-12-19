import { NextResponse } from 'next/server';
import { services } from '@/data';

export async function GET() {
    const sortedServices = [...services].sort((a, b) => a.order - b.order);
    return NextResponse.json(sortedServices);
}
