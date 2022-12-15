// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getBlogPost, updateBlogPost } from "../../../database/controllers/blogControllers";

export default function handler(req, res) {
  switch (req.method){
    case 'GET':
      getBlogPost(req,res)
      break;
    case 'POST':
      return res.status(200).json({})
      break;
    case 'DELETE':
      return res.status(200).json({})
      break;
    case 'PUT':
      updateBlogPost(req,res)
      break;
    defaults :
      res.setHeader("Allow",['GET','POST','PUT','DELETE'])
      res.status(405).end(`Method ${req.method} Not Allow`)
  }
}
