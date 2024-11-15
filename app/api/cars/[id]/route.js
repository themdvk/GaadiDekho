import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

// Get a specific car
export async function GET(request, { params }) {
  try {
    const car = await prisma.car.findUnique({
      where: {
        id: params.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    if (!car) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(car);
  } catch (error) {
    console.error('Error fetching car:', error);
    return NextResponse.json(
      { error: 'Error fetching car' },
      { status: 500 }
    );
  }
}

// Update a car
export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();

    // Check if the car exists and belongs to the user
    const existingCar = await prisma.car.findUnique({
      where: {
        id: params.id,
      },
      include: {
        user: true
      }
    });

    if (!existingCar) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }

    if (existingCar.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized - You can only edit your own listings' },
        { status: 403 }
      );
    }

    const updatedCar = await prisma.car.update({
      where: {
        id: params.id,
      },
      data: {
        ...body,
        userId: session.user.id
      },
    });

    return NextResponse.json(updatedCar);
  } catch (error) {
    console.error('Error updating car:', error);
    return NextResponse.json(
      { error: 'Error updating car' },
      { status: 500 }
    );
  }
}

// Delete a car
export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if the car exists and belongs to the user
    const existingCar = await prisma.car.findUnique({
      where: {
        id: params.id,
      },
      include: {
        user: true
      }
    });

    if (!existingCar) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }

    if (existingCar.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized - You can only delete your own listings' },
        { status: 403 }
      );
    }

    await prisma.car.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Error deleting car:', error);
    return NextResponse.json(
      { error: 'Error deleting car' },
      { status: 500 }
    );
  }
}
