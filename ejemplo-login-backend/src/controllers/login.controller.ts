import { Request, Response } from "express";
import { QueryResult } from "pg";
import { pool } from "../database/connection";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mail from '../lib/mailSender'

export class LoginController {

    async Login(req: Request, res: Response): Promise<Response> {
        const query = `SELECT createuser($1,$2,$3,$4,$5);`;
        try {
            const hash = bcrypt.hashSync(req.body.password, 10);
            const values = [req.body.name, req.body.lastname1, req.body.lastname2, req.body.email, hash];
            await pool.query("BEGIN");
            await pool.query(query, values);
            await pool.query("COMMIT");
            return res.status(200).json({
                msg: "User Created",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json("Internal Server Error");
        }
    }

    async testUser(req: Request, res: Response): Promise<Response> {
        const query = `select getpassword($1,'passCursor');`;
        const fetch = `FETCH ALL IN "passCursor";`;
        const client = await pool.connect();
        try {
            const emailBody = [req.body.email]
            await client.query("BEGIN");
            await client.query(query, emailBody);
            const pass: QueryResult = await client.query(fetch);
            await client.query("ROLLBACK");
            client.release();
            let response: any = { token: null };
            if (pass.rows[0] !== undefined) {
                if (bcrypt.compareSync(req.body.password, pass.rows[0].password)) {
                    // Passwords match
                    const token = jwt.sign({ email: 1 }, String(process.env.MASTER_PW), { expiresIn: '1800s' });
                    response = { token: token }
                }
            }
            return res.json(response);
        } catch (error) {
            console.log(error);
            return res.send({
                msg: "Internal Server Error",
            });
        }
    }

    async testToken(req: Request, res: Response): Promise<Response> {
        try {
            console.log(req.body.decoded.email);
            return res.json({
                msg: "Token Válido"
            });
        } catch (error) {
            return res.send({
                msg: "Internal Server Error",
            });
        }
    }

    async testMail(req: Request, res: Response): Promise<Response> {
        try {
            const subject = 'Prueba ProRed 👻'
            const text = "Hello world?"; // plain text body
            const html = "<b>Hello world?</b>"; // html body
            mail(req.body.email, subject, text, html);
            return res.json({});
        } catch (error) {
            return res.send({
                msg: "Internal Server Error",
            });
        }
    }
}

const fileController = new LoginController();
export default fileController;