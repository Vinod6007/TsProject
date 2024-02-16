import * as crypto from "crypto";
import * as Config from "../config/Enviornment";


/**
 * @author Ponjothi S  
 * @date  07-09-2023
 * @description This function return password encryption.
 * @param {String} text
 */
export let hashPassword = async (text) => {
  return await new Promise((resolve, reject) => {
    const hash = crypto.createHmac("sha256", Config.SERVER.SALT);
    hash.update(text.toString());
    resolve(hash.digest("hex"));
  });
};

export let decryptText = async (text) => {
  const decipher = crypto.createDecipheriv(Config.SERVER.SALT, Buffer.from("sha256"), Buffer.from(text.iv, 'hex'));
  let decrypted = decipher.update(text.encryptedText, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
};

