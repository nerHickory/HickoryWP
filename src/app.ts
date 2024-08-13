import {
  createBot,
  createFlow,
  MemoryDB,
  createProvider,
  addKeyword,
} from "@bot-whatsapp/bot";
import { BaileysProvider, handleCtx } from "@bot-whatsapp/provider-baileys";

const WelcomeFlow = addKeyword("hola").addAnswer(
  "Buenas, bienvenido desde chatbot"
);

const main = async () => {
  const provider = createProvider(BaileysProvider);

  provider.initHttpServer(3002);

  provider.http?.server.post(
    "/message",
    handleCtx(async (bot, req, res) => {
      console.log(req);

      const phone = req.body.phone;
      const message = req.body.message;
      const mediaUrl = req.body.mediaUrl;
      await bot.sendMessage(phone, message, {});
      res.end("Esto es del server de polka");
    })
  );

  await createBot({
    flow: createFlow([WelcomeFlow]),
    database: new MemoryDB(),
    provider: provider,
  });
};

main();
