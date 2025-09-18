import { NextRequest, NextResponse } from 'next/server';
import { SidebarManager } from '@/lib/sidebar-manager';

export async function GET() {
  try {
    const config = await SidebarManager.getConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error('Failed to fetch sidebar configuration:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sidebar configuration' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { label, path, icon, enabled = true } = body;

    if (!label || !path || !icon) {
      return NextResponse.json(
        { error: 'Missing required fields: label, path, icon' },
        { status: 400 }
      );
    }

    const newItem = await SidebarManager.addItem({
      label,
      path,
      icon,
      enabled
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Failed to create sidebar item:', error);
    return NextResponse.json(
      { error: 'Failed to create sidebar item' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    if (action === 'reorder') {
      await SidebarManager.reorderItems(data.itemIds);
      return NextResponse.json({ success: true });
    }

    const { id, ...updates } = data;
    if (!id) {
      return NextResponse.json(
        { error: 'Missing item id' },
        { status: 400 }
      );
    }

    const updatedItem = await SidebarManager.updateItem(id, updates);
    if (!updatedItem) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Failed to update sidebar item:', error);
    return NextResponse.json(
      { error: 'Failed to update sidebar item' },
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
        { error: 'Missing item id' },
        { status: 400 }
      );
    }

    const deleted = await SidebarManager.deleteItem(id);
    if (!deleted) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete sidebar item:', error);
    return NextResponse.json(
      { error: 'Failed to delete sidebar item' },
      { status: 500 }
    );
  }
}
