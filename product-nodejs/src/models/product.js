import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      require: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    brand: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Product", ProductSchema);
