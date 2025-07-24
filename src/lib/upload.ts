import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export async function uploadToCloudinary(fileBuffer: Buffer, filename: string) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ public_id: `profile_pics/${filename}` }, (error, result) => {
        if (error) return reject(error)
        resolve(result)
      })
      .end(fileBuffer)
  })
}
