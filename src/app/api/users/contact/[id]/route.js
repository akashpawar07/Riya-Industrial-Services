import { NextResponse } from 'next/server';
import connect from "@/Config/database";
import ContactModel from "@/models/contactModel";
import mongoose from 'mongoose';

export async function DELETE(req, { params }) {
    try {
        await connect();

        const { id } = params;

        // Validate if the ID is valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: "Invalid contact ID" },
                { status: 400 }
            );
        }

        const deletedContact = await ContactModel.findByIdAndDelete(id);

        if (!deletedContact) {
            return NextResponse.json(
                { error: "Contact not found", success: false },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Contact deleted successfully", success: true },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error deleting contact:", error);
        return NextResponse.json(
            { error: "Error deleting contact" },
            { status: 500 }
        );
    }
}