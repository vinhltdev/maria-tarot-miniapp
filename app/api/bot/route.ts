import { NextResponse } from 'next/server';

type TelegramWebhookBody = {
  message?: {
    text?: string;
    chat?: { id?: number };
    from?: { first_name?: string };
  };
  callback_query?: {
    id?: string;
    data?: string;
    from?: { first_name?: string };
    message?: {
      message_id?: number;
      chat?: { id?: number };
    };
  };
};

type TelegramReplyMarkup = {
  inline_keyboard: Array<Array<Record<string, unknown>>>;
};

async function callTelegram(token: string, method: string, payload: Record<string, unknown>) {
  return fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

function buildMainMenu(miniAppUrl: string): TelegramReplyMarkup {
  return {
    inline_keyboard: [
      [{ text: 'Rút bài ngay 🃏', web_app: { url: miniAppUrl } }],
      [
        { text: 'Báo cáo ngắn', callback_data: 'report_short' },
        { text: 'Bảng task', callback_data: 'report_table' },
      ],
      [{ text: 'Timeline', callback_data: 'report_timeline' }],
    ],
  };
}

function mapCallbackAction(data: string | undefined) {
  switch (data) {
    case 'report_short':
      return '✅ Bạn chọn: Báo cáo ngắn (5 dòng).';
    case 'report_table':
      return '✅ Bạn chọn: Bảng trạng thái task (ID / owner / status).';
    case 'report_timeline':
      return '✅ Bạn chọn: Timeline theo mốc thời gian.';
    default:
      return '❓ Mình chưa hiểu lựa chọn này. Hãy bấm /menu để chọn lại.';
  }
}

export async function POST(request: Request) {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const miniAppUrl = process.env.MINI_APP_URL ?? new URL(request.url).origin;

    if (!process.env.MINI_APP_URL) {
      console.warn('[bot-webhook] MINI_APP_URL is missing, fallback to request origin:', miniAppUrl);
    }

    if (!token) {
      console.warn('[bot-webhook] Missing TELEGRAM_BOT_TOKEN');
      return NextResponse.json(
        { ok: false, error: 'Missing required env: TELEGRAM_BOT_TOKEN' },
        { status: 500 },
      );
    }

    const body = (await request.json()) as TelegramWebhookBody;

    // 1) Handle inline button click (callback_query)
    if (body.callback_query?.id) {
      const callbackId = body.callback_query.id;
      const callbackData = body.callback_query.data;
      const chatId = body.callback_query.message?.chat?.id;

      await callTelegram(token, 'answerCallbackQuery', {
        callback_query_id: callbackId,
        text: 'Đã nhận lựa chọn 👌',
      });

      if (chatId) {
        const replyText = mapCallbackAction(callbackData);
        await callTelegram(token, 'sendMessage', {
          chat_id: chatId,
          text: replyText,
          reply_markup: buildMainMenu(miniAppUrl),
        });
      }

      return NextResponse.json({ ok: true });
    }

    // 2) Handle normal text message
    if (body.message?.text) {
      const text = body.message.text.toLowerCase();
      const chatId = body.message.chat?.id;

      if (!chatId) {
        return NextResponse.json({ ok: true });
      }

      if (text.startsWith('/menu')) {
        await callTelegram(token, 'sendMessage', {
          chat_id: chatId,
          text: 'Bạn muốn làm gì tiếp?',
          reply_markup: buildMainMenu(miniAppUrl),
        });
        return NextResponse.json({ ok: true });
      }

      if (text.startsWith('/start') || text.startsWith('/tarot') || text.startsWith('/que')) {
        const firstName = body.message.from?.first_name || 'chủ nhân';
        const responseText = `Chào mừng ${firstName} đến với thế giới huyền bí của Maria! ✨\n\nHãy chọn một nút bên dưới để bắt đầu nhé.`;

        await callTelegram(token, 'sendMessage', {
          chat_id: chatId,
          text: responseText,
          reply_markup: buildMainMenu(miniAppUrl),
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Bot Error:', error);
    return NextResponse.json({ ok: false, error: 'Failed to process bot message' }, { status: 500 });
  }
}
