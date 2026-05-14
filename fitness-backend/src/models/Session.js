import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true },
  sessionDate: { type: Date, required: true },
  durationMinutes: { type: Number, required: true },
  price: { type: Number, required: true },
  platformFee: { type: Number, required: true },
  trainerPayout: { type: Number, required: true },
  status: {
    type: String,
    enum: ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'],
    default: 'PENDING',
  },
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'PAID', 'REFUNDED'],
    default: 'PENDING',
  },
  paymentIntentId: { type: String },
}, { timestamps: true });

export default mongoose.model('Session', sessionSchema);
