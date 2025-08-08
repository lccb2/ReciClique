const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { createClient } = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const bucketName = "imagens";

module.exports = {
  async register(req, res) {
    try {
      const {
        name,
        email,
        instagram,
        phone,
        password,
        show_email,
        show_phone,
        show_insta,
        greeting,
      } = req.body;
      let photo = null;

      const hasUser = await User.findOne({
        where: {
          email,
        },
      });

      if (hasUser) {
        return res.status(403).json({
          errors: ["Email já cadastrado!"],
        });
      }

      if (req.file) {
        const fileName = `users/${email.replace(/\s/g, "_")}-${Date.now()}`;

        const { data, error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(fileName, req.file.buffer, {
            contentType: req.file.mimetype,
          });

        if (uploadError) {
          console.error("Erro no upload para o Supabase:", uploadError);
          return res.status(500).json({ errors: ["Erro ao salvar a imagem."] });
        }

        const { data: signedUrlData, error: signedUrlError } =
          await supabase.storage
            .from(bucketName)
            .createSignedUrl(data.path, 60 * 60);

        if (signedUrlError) {
          console.error("Erro ao gerar signed URL:", signedUrlError);
          return res
            .status(500)
            .json({ errors: ["Erro ao gerar URL da imagem."] });
        }

        photo = signedUrlData.signedUrl;
      }

      const user = await User.create({
        name,
        email,
        instagram,
        photo,
        phone,
        password_sent: password,
        show_email,
        show_phone,
        show_insta,
        greeting,
      });

      return res.json(user);
    } catch (error) {
      throw error;
    }
  },

  async login(req, res) {
    try {
      
        const { email, password } = req.body;
    
        if (!email || !password) {
          return res.status(401).json({
            errors: ["Credenciais inválidas"],
          });
        }
    
        const user = await User.findOne({ where: { email } });
    
        if (!user) {
          return res.status(401).json({
            errors: ["Credenciais inválidas"],
          });
        }
    
        const isPasswordValid = await user.passwordIsValid(password);
    
        if (!isPasswordValid) {
          return res.status(401).json({
            errors: ["Credenciais inválidas"],
          });
        }
    
        const { id } = user;
    
        const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
          expiresIn: process.env.TOKEN_EXPIRATION,
        });
    
        return res.json({ id, token });
    } catch (error) {
      throw error;
    }
  },
};
