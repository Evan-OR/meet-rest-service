import { buildUpadateUserQuery } from '@src/lib/dbQueries';
import { Request, Response } from 'express';

export const updateUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { displayName, description, job, dateOfBirth, gender, interestedIn } = req.body;

  try {
    const dataToUpdate = {
      ...(job && { job }),
      ...(displayName && { display_name: displayName }),
      ...(description && { description }),
      ...(dateOfBirth && { date_of_birth: dateOfBirth }),
      ...(gender != undefined && { gender_id: gender }),
      ...(interestedIn != undefined && { interested_in_gender_id: interestedIn }),
    };

    const { query, values } = buildUpadateUserQuery(id, dataToUpdate);

    const result = await req.db.query(query, values);
    const userData = result.rows[0];

    res.status(200).json({ msg: 'login successful', userData: userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'ERROR' });
  }
};
