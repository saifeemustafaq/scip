import { NextRequest, NextResponse } from 'next/server';
import { AdminSidebarManager } from '@/lib/admin-sidebar-manager';

export async function GET() {
  try {
    const config = await AdminSidebarManager.getConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error('Failed to fetch admin sidebar configuration:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin sidebar configuration' },
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

    const newItem = await AdminSidebarManager.addItem({
      label,
      path,
      icon,
      enabled
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Failed to create admin sidebar item:', error);
    return NextResponse.json(
      { error: 'Failed to create admin sidebar item' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    if (action === 'reorder') {
      await AdminSidebarManager.reorderItems(data.itemIds);
      return NextResponse.json({ success: true });
    }

    const { id, ...updates } = data;
    if (!id) {
      return NextResponse.json(
        { error: 'Missing item id' },
        { status: 400 }
      );
    }

    const updatedItem = await AdminSidebarManager.updateItem(id, updates);
    if (!updatedItem) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Failed to update admin sidebar item:', error);
    return NextResponse.json(
      { error: 'Failed to update admin sidebar item' },
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

    const deleted = await AdminSidebarManager.deleteItem(id);
    if (!deleted) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete admin sidebar item:', error);
    return NextResponse.json(
      { error: 'Failed to delete admin sidebar item' },
      { status: 500 }
    );
  }
}
