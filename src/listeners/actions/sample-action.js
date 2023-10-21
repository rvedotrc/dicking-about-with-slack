"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sampleActionCallback = ({ ack, client, body }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ack();
        yield client.views.update({
            view_id: body.view.id,
            hash: body.view.hash,
            view: {
                type: 'modal',
                callback_id: 'sample_view_id',
                title: {
                    type: 'plain_text',
                    text: 'Updated modal title',
                },
                blocks: [
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: 'Nice! You updated the modal! :tada:',
                        },
                    },
                    {
                        type: 'image',
                        image_url: 'https://media.giphy.com/media/SVZGEcYt7brkFUyU90/giphy.gif',
                        alt_text: 'Yay! The modal was updated',
                    },
                    {
                        type: 'input',
                        block_id: 'input_block_id',
                        label: {
                            type: 'plain_text',
                            text: 'What are your hopes and dreams?',
                        },
                        element: {
                            type: 'plain_text_input',
                            action_id: 'sample_input_id',
                            multiline: true,
                        },
                    },
                    {
                        block_id: 'select_channel_block_id',
                        type: 'input',
                        label: {
                            type: 'plain_text',
                            text: 'Select a channel to message the result to',
                        },
                        element: {
                            type: 'conversations_select',
                            action_id: 'sample_dropdown_id',
                            response_url_enabled: true,
                        },
                    },
                ],
                submit: {
                    type: 'plain_text',
                    text: 'Submit',
                },
            },
        });
    }
    catch (error) {
        console.error(error);
    }
});
exports.default = sampleActionCallback;
