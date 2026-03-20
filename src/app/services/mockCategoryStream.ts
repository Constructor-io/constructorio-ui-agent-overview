const mockCategories = [
  {
    title: 'Slim Dress Pants',
    imageUrl:
      'https://constructorio-integrations.s3.amazonaws.com/tikus-threads/2022-06-29/PANT_DRESS-PANT_BWB00288SBLR45_1_category.jpg',
  },
  {
    title: 'Slim Chinos',
    imageUrl:
      'https://constructorio-integrations.s3.amazonaws.com/tikus-threads/2022-06-29/PANT_CHINO-PANT_BPT10629S1050G_3_category.jpg',
  },
  {
    title: 'Slim Jeans',
    imageUrl:
      'https://constructorio-integrations.s3.amazonaws.com/tikus-threads/2022-06-29/DENIM_DENIM-JEAN_23081-BLU32_1_category.jpg',
  },
  {
    title: 'Performance Slim Pants',
    imageUrl:
      'https://constructorio-integrations.s3.amazonaws.com/tikus-threads/2022-06-29/PANT_ACTIVE-PANT_GPT10994S1131G_1_category.jpg',
  },
];

export function createMockCategoryStream(): ReadableStream<unknown> {
  return new ReadableStream({
    start(controller) {
      controller.enqueue({
        type: 'start',
        data: { intent_result_id: 'mock-id', thread_id: null },
      });

      controller.enqueue({
        type: 'message',
        data: {
          text: "Here's your casual business outfit: coordinated pieces that create a sharp yet comfortable style.",
        },
      });

      for (const category of mockCategories) {
        controller.enqueue({
          type: 'search_result',
          data: {
            title: category.title,
            response: {
              results: [
                {
                  value: category.title,
                  data: {
                    image_url: category.imageUrl,
                    url: '',
                    price: 0,
                  },
                },
              ],
            },
          },
        });
      }

      controller.close();
    },
  });
}
