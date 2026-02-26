'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

type GradeLevel = 10 | 11 | 12;

export async function updateUserGrade(grade: GradeLevel) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error('User not authenticated');
    }

    const client = await clerkClient();

    await client.users.updateUserMetadata(userId, {
        publicMetadata: {
            grade,
            isOnboarded: true,
        },
    });

    // Revalidate all pages to pick up new metadata
    revalidatePath('/', 'layout');
    revalidatePath('/profile');

    return { success: true, grade };
}

export async function getUserGrade(): Promise<GradeLevel | null> {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
        return null;
    }

    const metadata = sessionClaims?.publicMetadata as { grade?: GradeLevel } | undefined;
    return metadata?.grade ?? null;
}
