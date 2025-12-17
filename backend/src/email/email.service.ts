import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

interface ContactEmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface BookingEmailPayload {
  name: string;
  email: string;
  phone: string;
  destinationTitle: string;
  tourDate: string;
  numberOfPeople: number;
  specialRequest?: string;
}

interface BookingStatusPayload {
  name: string;
  email: string;
  destinationTitle: string;
  status: string;
}

@Injectable()
export class EmailService {
  private resend: Resend | null;
  private fromEmail: string;
  private adminEmail: string;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    this.resend = apiKey ? new Resend(apiKey) : null;
    this.fromEmail = this.configService.get<string>('FROM_EMAIL') || 'info@amishalomtours.com';
    this.adminEmail = this.configService.get<string>('ADMIN_EMAIL') || 'info@amishalomtours.com';
  }

  async sendContactEmail(data: ContactEmailPayload) {
    const client = this.resend;
    if (!client) {
      console.warn('Resend API key not configured. Email not sent.');
      return { success: false, message: 'Email service not configured' };
    }

    try {
      // Send to admin
      await client.emails.send({
        from: this.fromEmail,
        to: this.adminEmail,
        subject: `New Contact Form: ${data.subject}`,
        html: this.getContactEmailHTML(data, 'admin'),
        text: this.getContactEmailText(data, 'admin'),
      });

      // Send confirmation to user
      await client.emails.send({
        from: this.fromEmail,
        to: data.email,
        subject: 'Thank you for contacting Ami Shalom Tours',
        html: this.getContactEmailHTML(data, 'user'),
        text: this.getContactEmailText(data, 'user'),
      });

      return { success: true };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }
  }

  async sendBookingEmail(data: BookingEmailPayload) {
    const client = this.resend;
    if (!client) {
      console.warn('Resend API key not configured. Email not sent.');
      return { success: false, message: 'Email service not configured' };
    }

    try {
      // Send to admin
      await client.emails.send({
        from: this.fromEmail,
        to: this.adminEmail,
        subject: `New Booking: ${data.destinationTitle}`,
        html: this.getBookingEmailHTML(data, 'admin'),
        text: this.getBookingEmailText(data, 'admin'),
      });

      // Send confirmation to user
      await client.emails.send({
        from: this.fromEmail,
        to: data.email,
        subject: 'Booking Confirmation - Ami Shalom Tours',
        html: this.getBookingEmailHTML(data, 'user'),
        text: this.getBookingEmailText(data, 'user'),
      });

      return { success: true };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }
  }

  async sendBookingStatusUpdate(data: BookingStatusPayload) {
    const client = this.resend;
    if (!client) {
      console.warn('Resend API key not configured. Email not sent.');
      return { success: false, message: 'Email service not configured' };
    }

    try {
      await client.emails.send({
        from: this.fromEmail,
        to: data.email,
        subject: `Booking Update: ${data.destinationTitle}`,
        html: this.getBookingStatusHTML(data),
        text: this.getBookingStatusText(data),
      });

      return { success: true };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }
  }

  private getContactEmailHTML(data: ContactEmailPayload, type: 'admin' | 'user'): string {
    if (type === 'admin') {
      return `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `;
    } else {
      return `
        <h2>Thank you for contacting Ami Shalom Tours!</h2>
        <p>Dear ${data.name},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p><strong>Your message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
        <p>Best regards,<br>Ami Shalom Tours Team</p>
      `;
    }
  }

  private getContactEmailText(data: ContactEmailPayload, type: 'admin' | 'user'): string {
    if (type === 'admin') {
      return `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}
      `;
    } else {
      return `
Thank you for contacting Ami Shalom Tours!

Dear ${data.name},

We have received your message and will get back to you as soon as possible.

Your message:
${data.message}

Best regards,
Ami Shalom Tours Team
      `;
    }
  }

  private getBookingEmailHTML(data: BookingEmailPayload, type: 'admin' | 'user'): string {
    if (type === 'admin') {
      return `
        <h2>New Booking Received</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Destination:</strong> ${data.destinationTitle}</p>
        <p><strong>Tour Date:</strong> ${data.tourDate}</p>
        <p><strong>Number of People:</strong> ${data.numberOfPeople}</p>
        ${data.specialRequest ? `<p><strong>Special Request:</strong> ${data.specialRequest}</p>` : ''}
      `;
    } else {
      return `
        <h2>Booking Confirmation</h2>
        <p>Dear ${data.name},</p>
        <p>Thank you for your booking with Ami Shalom Tours!</p>
        <p><strong>Booking Details:</strong></p>
        <ul>
          <li><strong>Destination:</strong> ${data.destinationTitle}</li>
          <li><strong>Tour Date:</strong> ${data.tourDate}</li>
          <li><strong>Number of People:</strong> ${data.numberOfPeople}</li>
        </ul>
        <p>Your booking is currently pending approval. We will review your request and contact you shortly.</p>
        <p>Best regards,<br>Ami Shalom Tours Team</p>
      `;
    }
  }

  private getBookingEmailText(data: BookingEmailPayload, type: 'admin' | 'user'): string {
    if (type === 'admin') {
      return `
New Booking Received

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Destination: ${data.destinationTitle}
Tour Date: ${data.tourDate}
Number of People: ${data.numberOfPeople}
${data.specialRequest ? `Special Request: ${data.specialRequest}` : ''}
      `;
    } else {
      return `
Booking Confirmation

Dear ${data.name},

Thank you for your booking with Ami Shalom Tours!

Booking Details:
- Destination: ${data.destinationTitle}
- Tour Date: ${data.tourDate}
- Number of People: ${data.numberOfPeople}

Your booking is currently pending approval. We will review your request and contact you shortly.

Best regards,
Ami Shalom Tours Team
      `;
    }
  }

  private getBookingStatusHTML(data: BookingStatusPayload): string {
    const statusMessages: Record<string, string> = {
      Confirmed: 'Your booking has been confirmed! We look forward to welcoming you.',
      Cancelled: 'Your booking has been cancelled. If you have any questions, please contact us.',
      Pending: 'Your booking status has been updated to pending.',
    };

    return `
      <h2>Booking Status Update</h2>
      <p>Dear ${data.name},</p>
      <p>Your booking for <strong>${data.destinationTitle}</strong> has been updated.</p>
      <p><strong>Status:</strong> ${data.status}</p>
      <p>${statusMessages[data.status] || 'Your booking status has been updated.'}</p>
      <p>Best regards,<br>Ami Shalom Tours Team</p>
    `;
  }

  private getBookingStatusText(data: BookingStatusPayload): string {
    const statusMessages: Record<string, string> = {
      Confirmed: 'Your booking has been confirmed! We look forward to welcoming you.',
      Cancelled: 'Your booking has been cancelled. If you have any questions, please contact us.',
      Pending: 'Your booking status has been updated to pending.',
    };

    return `
Booking Status Update

Dear ${data.name},

Your booking for ${data.destinationTitle} has been updated.

Status: ${data.status}

${statusMessages[data.status] || 'Your booking status has been updated.'}

Best regards,
Ami Shalom Tours Team
    `;
  }
}

