import { config } from 'dotenv';
import nodemailer from 'nodemailer';

import { google } from 'googleapis';
config();

const OAuth2 = google.auth.OAuth2;

const oauthClient = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oauthClient.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

export const sendEmail = async (to, subject, text) => {
  try {
    const accessToken = await oauthClient.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'oauth2',
        user: process.env.EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: to,
      subject: subject,
      text: text,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
