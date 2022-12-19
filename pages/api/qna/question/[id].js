// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getQnaQuestion, updateQnaQuestion } from "../../../../database/controllers/qnaControllers";

export default function handler(req, res) {
  switch (req.method){
    case 'GET':
      getQnaQuestion(req, res)
      break;
    case 'POST':
      return res.status(200).json({})
      break;
    case 'DELETE':
      return res.status(200).json({})
      break;
    case 'PUT':
      updateQnaQuestion(req,res)
      break;
    defaults :
      res.setHeader("Allow",['GET','POST','PUT','DELETE'])
      res.status(405).end(`Method ${req.method} Not Allow`)
  }
}
