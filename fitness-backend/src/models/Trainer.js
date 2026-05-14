import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialties: [{ type: String }],
  bio: { type: String, maxlength: 500 },
  hourlyRate: { type: Number, required: true },
  availability: [{
    day: { type: String }, // e.g., 'Monday'
    timeSlots: [{ type: String }] // e.g., '10:00-11:00'
  }],
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  stripeAccountId: { type: String } // For payouts
});

export default mongoose.model('Trainer', trainerSchema);
