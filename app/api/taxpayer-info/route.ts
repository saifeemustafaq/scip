import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllTaxpayers, 
  saveTaxpayer, 
  getTaxpayerById,
  updateTaxpayer,
  deleteTaxpayer 
} from '@/lib/taxpayer-storage';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const taxpayer = await getTaxpayerById(id);
      if (!taxpayer) {
        return NextResponse.json(
          { error: 'Taxpayer not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(taxpayer);
    }

    const taxpayers = await getAllTaxpayers();
    return NextResponse.json(taxpayers);
  } catch (error) {
    console.error('Error fetching taxpayer information:', error);
    return NextResponse.json(
      { error: 'Failed to fetch taxpayer information' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.personalInfo || !data.addressInfo) {
      return NextResponse.json(
        { error: 'Missing required information' },
        { status: 400 }
      );
    }

    // Save taxpayer data
    const savedTaxpayer = await saveTaxpayer(data);

    return NextResponse.json({ 
      success: true, 
      message: 'Taxpayer information saved successfully',
      taxpayer: savedTaxpayer
    }, { 
      status: 201 
    });
  } catch (error) {
    console.error('Error saving taxpayer information:', error);
    return NextResponse.json(
      { error: 'Failed to save taxpayer information' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing taxpayer ID' },
        { status: 400 }
      );
    }

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

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing taxpayer ID' },
        { status: 400 }
      );
    }

    const deleted = await deleteTaxpayer(id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Taxpayer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Taxpayer information deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting taxpayer information:', error);
    return NextResponse.json(
      { error: 'Failed to delete taxpayer information' },
      { status: 500 }
    );
  }
}