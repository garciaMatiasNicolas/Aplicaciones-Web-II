const Order = require('../data/orders');
const Product = require('../data/products');
const nodemailer = require('nodemailer');
require('dotenv').config();

async function createOrderAndSendEmail(cart, userEmail) {
  try {
    let total = 0;
    const productsDetails = [];
    for (const item of cart) {
      const product = await Product.findById(item._id);
      if (!product) throw new Error(`Producto no encontrado: ${item.productId}`);
      const subtotal = product.price * item.quantity;
      total += subtotal;
      productsDetails.push({
        name: product.name,
        quantity: item.quantity,
        price: product.price,
        subtotal
      });
    }

    const order = new Order({
      products: cart,
      total,
      email: userEmail
    });

    await order.save();

    // Configurar nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // o tu proveedor SMTP
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Construir el contenido del email
    let productList = productsDetails.map(
      p => `${p.name} x${p.quantity} - $${p.price} (Subtotal: $${p.subtotal})`
    ).join('\n');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: 'Confirmación de tu orden de compra',
      text: `Gracias por tu compra. Detalles de la orden:\n\n${productList}\n\nTotal: $${total}`
    };

    // Enviar email
    await transporter.sendMail(mailOptions);

    return { success: true, orderId: order._id };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = { createOrderAndSendEmail };