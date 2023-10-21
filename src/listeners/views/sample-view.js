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
const sampleViewCallback = ({ ack, view, body, client }) => __awaiter(void 0, void 0, void 0, function* () {
    yield ack();
    try {
        const { input_block_id, select_channel_block_id } = view.state.values;
        const sampleInputValue = input_block_id.sample_input_id.value;
        const sampleConvoValue = select_channel_block_id.sample_dropdown_id.selected_conversation;
        client.chat.postMessage({
            channel: sampleConvoValue || body.user.id,
            text: `<@${body.user.id}> submitted the following :sparkles: hopes and dreams :sparkles:: \n\n ${sampleInputValue}`,
        });
    }
    catch (error) {
        console.error(error);
    }
});
exports.default = sampleViewCallback;
