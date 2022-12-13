// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getCategory } from "../../../database/controllers/categoryController";

export default function handler(req, res) {
  switch (req.method){
    case 'GET':
      getCategory(req,res)
      break;
    case 'POST':
      return res.status(200).json({})
      break;
    case 'DELETE':
      return res.status(200).json({})
      break;
    case 'PUT':
      return res.status(200).json({})
      break;
    defaults :
      res.setHeader("Allow",['GET','POST','PUT','DELETE'])
      res.status(405).end(`Method ${req.method} Not Allow`)
  }
}
