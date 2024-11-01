export const sendSupportMessageController = async (req, res) => {
  const email = req.body.email
  console.log(email);

  // try {
  //   await sendEmailRequest({
  //     to: email,
  //     from: env(SMTP.SMTP_FROM),
  //     sudject: 'Reset your password',
  //     html,
  //   });
  // } catch (error) {
  //   console.log(error);
  //   throw createHttpError(
  //     500,
  //     'Failed to send the email, please try again later.',
  //   );
  // }

  res.json({
    status:200,
    message: `Hello, ${email}. Thank you for contacting our support team. We have received your request and will get in touch with you shortly to provide all necessary assistance. Best regards, Support Team`
  })
};
