export interface TarotCard {
  id: string;
  name: string;
  image: string;
  meaning: {
    upright: string;
    reversed: string;
  };
  description: string;
}

export const majorArcana: TarotCard[] = [
  {
    id: "0",
    name: "The Fool",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg",
    meaning: {
      upright: "Khởi đầu mới, ngây thơ, tự phát, tinh thần tự do.",
      reversed: "Giữ lại, liều lĩnh, mạo hiểm, dại dột."
    },
    description: "Chàng khờ đại diện cho những khởi đầu mới, tiềm năng vô hạn và niềm tin vào vũ trụ."
  },
  {
    id: "1",
    name: "The Magician",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg",
    meaning: {
      upright: "Ý chí, sức mạnh, hành động, khả năng sáng tạo.",
      reversed: "Thao túng, ảo tưởng, tài năng bị lãng phí."
    },
    description: "Nhà ảo thuật kết nối giữa trời và đất, biến ý tưởng thành hiện thực."
  },
  {
    id: "2",
    name: "The High Priestess",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg",
    meaning: {
      upright: "Trực giác, bí ẩn, tiềm thức, nữ tính thiêng liêng.",
      reversed: "Bí mật, ngắt kết nối với trực giác, sự rút lui."
    },
    description: "Nữ đại tư tế là người giữ gìn những bí mật và trực giác sâu thẳm."
  },
  {
    id: "3",
    name: "The Empress",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg",
    meaning: {
      upright: "Sự phong phú, nuôi dưỡng, khả năng sinh sản, vẻ đẹp.",
      reversed: "Sự phụ thuộc, ngột ngạt, thiếu sáng tạo."
    },
    description: "Hoàng hậu đại diện cho mẹ thiên nhiên, sự sinh sôi và lòng trắc ẩn."
  },
  {
    id: "4",
    name: "The Emperor",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg",
    meaning: {
      upright: "Thẩm quyền, cấu trúc, sự kiểm soát, người cha.",
      reversed: "Sự chuyên chế, thiếu kỷ luật, sự cứng nhắc."
    },
    description: "Hoàng đế là biểu tượng của trật tự, kỷ luật và quyền lực thế gian."
  },
  {
    id: "5",
    name: "The Hierophant",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg",
    meaning: {
      upright: "Truyền thống, niềm tin, sự tuân thủ, giáo dục.",
      reversed: "Sự nổi loạn, niềm tin cá nhân, sự thay đổi."
    },
    description: "Giáo hoàng đại diện cho các giá trị truyền thống và sự dẫn dắt tâm linh."
  },
  {
    id: "6",
    name: "The Lovers",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/RWS_Tarot_06_Lovers.jpg",
    meaning: {
      upright: "Tình yêu, sự hòa hợp, các mối quan hệ, sự lựa chọn.",
      reversed: "Sự mất cân bằng, thiếu hòa hợp, sự lựa chọn sai lầm."
    },
    description: "Những người tình đại diện cho sự kết nối tâm hồn và các quyết định quan trọng."
  },
  {
    id: "7",
    name: "The Chariot",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg",
    meaning: {
      upright: "Chiến thắng, ý chí, sự quyết tâm, sự kiểm soát.",
      reversed: "Thiếu định hướng, thất bại, sự hung hăng."
    },
    description: "Cỗ xe đại diện cho sự tiến lên phía trước bằng ý chí và lòng dũng cảm."
  },
  {
    id: "8",
    name: "Strength",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg",
    meaning: {
      upright: "Sức mạnh nội tâm, lòng dũng cảm, sự kiên nhẫn, lòng trắc ẩn.",
      reversed: "Sự tự ti, yếu đuối, sự hung hăng."
    },
    description: "Sức mạnh không đến từ cơ bắp, mà đến từ sự dịu dàng và kiên định của tâm hồn."
  },
  {
    id: "9",
    name: "The Hermit",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg",
    meaning: {
      upright: "Sự cô độc, tìm kiếm nội tâm, sự dẫn dắt, chiêm nghiệm.",
      reversed: "Sự cô lập, rút lui quá mức, sự dại dột."
    },
    description: "Ẩn sĩ đi vào bóng tối để tìm kiếm ánh sáng của sự thật bên trong."
  },
  {
    id: "10",
    name: "Wheel of Fortune",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg",
    meaning: {
      upright: "Sự thay đổi, định mệnh, chu kỳ, may mắn.",
      reversed: "Vận rủi, sự phản kháng trước thay đổi, chu kỳ tiêu cực."
    },
    description: "Vòng quay số phận nhắc nhở chúng ta rằng mọi thứ luôn luôn thay đổi."
  },
  {
    id: "11",
    name: "Justice",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg",
    meaning: {
      upright: "Công lý, sự thật, nhân quả, trách nhiệm.",
      reversed: "Sự bất công, thiếu trung thực, không chịu trách nhiệm."
    },
    description: "Công lý đại diện cho sự cân bằng và hệ quả của mọi hành động."
  },
  {
    id: "12",
    name: "The Hanged Man",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg",
    meaning: {
      upright: "Sự hy sinh, buông bỏ, góc nhìn mới, sự chờ đợi.",
      reversed: "Sự trì trệ, kháng cự, hy sinh vô ích."
    },
    description: "Người treo ngược dạy chúng ta cách nhìn thế giới từ một góc độ hoàn toàn khác."
  },
  {
    id: "13",
    name: "Death",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg",
    meaning: {
      upright: "Sự kết thúc, sự biến đổi, sự chuyển giao, buông bỏ.",
      reversed: "Sự trì hoãn, sợ hãi thay đổi, sự lặp lại."
    },
    description: "Cái chết không phải là kết thúc, mà là sự dọn dẹp cho một khởi đầu mới."
  },
  {
    id: "14",
    name: "Temperance",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg",
    meaning: {
      upright: "Sự điều độ, cân bằng, kiên nhẫn, sự kết hợp.",
      reversed: "Sự mất cân bằng, thiếu điều độ, sự xung đột."
    },
    description: "Sự tiết độ là nghệ thuật pha trộn các yếu tố để tạo ra sự hài hòa."
  },
  {
    id: "15",
    name: "The Devil",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg",
    meaning: {
      upright: "Sự ràng buộc, nghiện ngập, vật chất, sự cám dỗ.",
      reversed: "Sự giải thoát, tự do, nhận thức về xiềng xích."
    },
    description: "Ác quỷ đại diện cho những xiềng xích tự ta đeo vào chính mình."
  },
  {
    id: "16",
    name: "The Tower",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg",
    meaning: {
      upright: "Sự sụp đổ đột ngột, thảm họa, sự thức tỉnh, thay đổi lớn.",
      reversed: "Sợ hãi thảm họa, tránh né sự thật, sự trì hoãn."
    },
    description: "Tòa tháp sụp đổ để phá vỡ những nền tảng giả tạo và lỗi thời."
  },
  {
    id: "17",
    name: "The Star",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg",
    meaning: {
      upright: "Hy vọng, niềm tin, sự chữa lành, cảm hứng.",
      reversed: "Thiếu niềm tin, tuyệt vọng, sự mất kết nối."
    },
    description: "Ngôi sao mang lại ánh sáng hy vọng sau cơn giông bão."
  },
  {
    id: "18",
    name: "The Moon",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg",
    meaning: {
      upright: "Ảo tưởng, nỗi sợ, sự lo lắng, trực giác.",
      reversed: "Giải tỏa nỗi sợ, sự thật dần lộ diện, sự nhầm lẫn."
    },
    description: "Mặt trăng dẫn lối qua bóng tối của tiềm thức và những ảo ảnh."
  },
  {
    id: "19",
    name: "The Sun",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg",
    meaning: {
      upright: "Niềm vui, thành công, sự sống động, sự tự tin.",
      reversed: "Sự bi quan, thiếu năng lượng, thành công tạm thời."
    },
    description: "Mặt trời là nguồn sáng rực rỡ mang lại sự ấm áp và chiến thắng."
  },
  {
    id: "20",
    name: "Judgement",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg",
    meaning: {
      upright: "Sự phán xét, tái sinh, sự kêu gọi, sự tha thứ.",
      reversed: "Sự tự nghi ngờ, thiếu quyết đoán, sự trì hoãn."
    },
    description: "Sự phán xét là tiếng gọi của linh hồn để bước vào một chương mới."
  },
  {
    id: "21",
    name: "The World",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg",
    meaning: {
      upright: "Sự hoàn thành, thành tựu, du hành, sự trọn vẹn.",
      reversed: "Thiếu sự hoàn tất, sự trì trệ, thiếu tầm nhìn."
    },
    description: "Thế giới là sự kết thúc viên mãn của một cuộc hành trình dài."
  }
];
