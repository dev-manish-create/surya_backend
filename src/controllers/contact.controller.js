import Contact from '../models/Contact.js';
import mailer from '../utils/mailer.js';
export const createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    try {
      await mailer.send({ to: process.env.ADMIN_EMAIL, subject: `New Enquiry: ${contact.name}`, html: `<p>${contact.message}</p>` });
    } catch(e) { console.error('Mailer failed', e.message); }
    res.status(201).json({ message: 'Enquiry received', contact });
  } catch (err) { next(err); }
};
export const listContacts = async (req,res,next)=>{
  try {
    const items = await Contact.find().sort({ createdAt: -1 }).limit(200);
    res.json({ data: items });
  } catch(err){ next(err); }
};
