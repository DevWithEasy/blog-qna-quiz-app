import mongoose from 'mongoose';

const demoSchema = mongoose.Schema({
    name: {
    type: String,
    required: true,
    }
})

const Demo = mongoose.models?.Demo || mongoose.model('Demo', demoSchema)

export default Demo;