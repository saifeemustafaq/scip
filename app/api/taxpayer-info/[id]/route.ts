import { NextRequest, NextResponse } from 'next/server';
import { updateTaxpayer } from '@/lib/taxpayer-storage';

type RouteContext = {
  params: Promise<{ id: string }> | { id: string }
};

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  const params = await Promise.resolve(context.params);
  try {
    const id = params.id;
    const updates = await request.json();
    
    const updatedTaxpayer = await updateTaxpayer(id, updates);

    if (!updatedTaxpayer) {
      return NextResponse.json(
        { error: 'Taxpayer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Taxpayer information updated successfully',
      taxpayer: updatedTaxpayer
    });
  } catch (error) {
    console.error('Error updating taxpayer information:', error);
    return NextResponse.json(
      { error: 'Failed to update taxpayer information' },
      { status: 500 }
    );
  }
}
