import ContactModel from "@/models/contactModel";
import { NextResponse } from 'next/server';
import connect from "@/Config/database";

// Database connection
connect();

export async function POST(request) {
    try {
        // Get data from body
        const reqBody = await request.json();
        const { name, email, phone, subject, message } = reqBody;
        // console.log("what is comming in body : ", reqBody)

        // Check for mandatory fields
        if (!name || !email || !phone || !subject || !message) {
            console.log("All fields are mandatory");
            return NextResponse.json({
                success: false,
                message: "All fields are mandatory"
            }, { status: 400 });
        }

        // If all validations pass, save contact (make sure ContactModel is defined)
        const newContact = new ContactModel({ name, email, phone, subject, message });
        await newContact.save();

        console.log("Message sent successfully..[server].. ");
        return NextResponse.json({
            success: true,
            message: "Message sent successfully"
        }, { status: 201 });

    } catch (error) {
        console.error("Request failed:", error); // Log full error for debugging
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(request) {
    try {

        const allContacts = await ContactModel.find(); //finding contacts present in contactModel

        if (!allContacts) {
            console.log("Contacts not found...[server]...")
            return;
        }

        return NextResponse.json({
            success: true,
            message: "Contact fetch Successfuly.",
            data: allContacts
        }, { status: 201 })

    } catch (error) {
        console.log("failed to load contacts...[server]...")
        return NextResponse.json({
            message: "failed to laod contacts",
            success: false,
        }, { status: 500 })
    }
}

// Delete single contact
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
                { error: "Contact not found", success : false },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Contact deleted successfully", success : true },
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
