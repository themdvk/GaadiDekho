import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  images: [{
    type: String,
    required: [true, 'Please provide at least one image URL'],
    validate: {
      validator: function(v) {
        // Basic URL validation
        const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return urlPattern.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  }],
  tags: {
    car_type: String,
    company: String,
    dealer: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add text index for search functionality
carSchema.index({
  title: 'text',
  description: 'text',
  'tags.car_type': 'text',
  'tags.company': 'text',
  'tags.dealer': 'text',
});

const Car = mongoose.models.Car || mongoose.model('Car', carSchema);

export default Car;
