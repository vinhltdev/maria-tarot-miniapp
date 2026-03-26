import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const miniAppUrl = "https://maria-tarot-miniapp.vercel.app";

    // Kiểm tra nếu có tin nhắn và nội dung là lệnh /start hoặc /tarot
    if (body.message && body.message.text) {
      const text = body.message.text.toLowerCase();
      
      if (text.startsWith('/start') || text.startsWith('/tarot') || text.startsWith('/que')) {
        const chatId = body.message.chat.id;
        const firstName = body.message.from.first_name || "chủ nhân";
        
        const responseText = `Chào mừng ${firstName} đến với thế giới huyền bí của Maria! ✨\n\nHãy chạm vào lá bài bên dưới để xem định mệnh nói gì với bạn hôm nay nhé. 🔮`;

        const payload = {
          chat_id: chatId,
          text: responseText,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Rút bài ngay 🃏",
                  web_app: { url: miniAppUrl }
                }
              ]
            ]
          }
        };

        // Gửi tin nhắn phản hồi qua Telegram API
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Bot Error:', error);
    return NextResponse.json({ ok: false, error: 'Failed to process bot message' }, { status: 500 });
  }
}
