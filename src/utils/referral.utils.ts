import { Patient } from "../schemas";
import dotenv from "dotenv";

dotenv.config();

export const generateUniqueReferralCode = async (): Promise<string> => {

    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    const generate = () => {
        let code = "REF-";
        for (let i = 0; i < 6; i++) {
            code += chars[Math.floor(Math.random() * chars.length)];
        }
        return code;
    };

    let code = generate();
    let exists = await Patient.findOne({ referral_code: code });

    // retry until unique
    while (exists) {
        code = generate();
        exists = await Patient.findOne({ referral_code: code });
    }

    return code;
};

export const generateReferralLink = (code: string): string => {
    return `${process.env.CLIENT_URL}/ref/${code}`;
};