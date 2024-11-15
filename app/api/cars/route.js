import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/app/middleware/auth';

// Create a new car
export async function POST(request) {
  try {
    const token = await auth(request);
    if (token.error) return token;

    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.description || !data.images || data.images.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate maximum 10 images
    if (data.images.length > 10) {
      return NextResponse.json(
        { error: 'Maximum 10 images allowed' },
        { status: 400 }
      );
    }

    const car = await prisma.car.create({
      data: {
        ...data,
        userId: token.id
      }
    });

    return NextResponse.json(car, { status: 201 });
  } catch (error) {
    console.error('Create car error:', error);
    return NextResponse.json(
      { error: 'Failed to create car' },
      { status: 500 }
    );
  }
}

// Get all cars - public access
export async function GET() {
  try {
    const cars = await prisma.car.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(cars);
  } catch (error) {
    console.error('Get cars error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cars' },
      { status: 500 }
    );
  }
}
