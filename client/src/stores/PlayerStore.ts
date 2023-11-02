
import mitt from 'mitt';
import { defineStore } from 'pinia';

import { ICommentData } from '@/services/player/managers/LiveCommentManager2';
import { IRecordedProgram, IRecordedProgramDefault } from '@/services/Videos';
import useSettingsStore from '@/stores/SettingsStore';


/**
 * プレイヤーに関連するイベントの型
 * PlayerManager 側からのイベントも UI 側からのイベントも PlayerEvents を通じて行う
 */
export type PlayerEvents = {
    // UI コンポーネントからプレイヤーに通知メッセージの送信を要求する
    // DPlayer.notice() の引数と同じで、そのまま DPlayer.notice() に渡される
    SendNotification: {
        message: string;  // 通知メッセージの内容
        duration?: number;  // 通知メッセージの表示時間 (ミリ秒)
        opacity?: number;  // 通知メッセージの透明度
        color?: string;  // 通知メッセージの文字色
    }
    // PlayerManager からプレイヤーロジックの再起動が必要になったことを通知する
    PlayerRestartRequired: {
        message: string;  // プレイヤーに通知するメッセージ
    };
    // PlayerWrapper.setControlDisplayTimer() をそのまま呼び出す
    SetControlDisplayTimer: void;
    // CaptureManager からキャプチャの撮影が完了したことを通知する
    CaptureCompleted: {
        capture: Blob;  // キャプチャの Blob
        filename: string;  // キャプチャのファイル名 (UI からの手動ダウンロード時に使う)
    };
    // ライブ視聴: LiveCommentManager からコメントを受信したことを通知する
    LiveCommentReceived: {
        is_initial_comments: boolean;  // 初期コメントかどうか
        comments: ICommentData[];  // コメントデータのリスト
    }
    // ライブ視聴: LiveCommentManager からコメントを送信したことを通知する
    LiveCommentSendCompleted: {
        comment: ICommentData;  // 送信したコメントデータ (を整形したもの)
    }
};


/**
 * プレイヤー側の再生ロジックと UI 表示側で共有される状態を管理するストア
 * 主に PlayerWrapper や PlayerManager から状態変化に合わせて変更された値を UI に反映するためのもの
 */
const usePlayerStore = defineStore('player', {
    state: () => ({

        // プレイヤーに関連するイベントを発行する EventEmitter
        event_emitter: mitt<PlayerEvents>(),

        // 現在視聴中の録画番組の情報
        // 視聴中の録画番組がない場合は IRecordedProgramDefault を設定すべき (初期値も IRecordedProgramDefault にしている)
        recorded_program: IRecordedProgramDefault as IRecordedProgram,

        // 仮想キーボードが表示されているか
        // 既定で表示されていない想定
        is_virtual_keyboard_display: false,

        // フルスクリーン状態かどうか
        is_fullscreen: false,

        // コントロールを表示するか
        is_control_display: true,

        // パネルを表示するか
        // panel_display_state が "AlwaysDisplay" なら常に表示し、"AlwaysFold" なら常に折りたたむ
        // "RestorePreviousState" なら showed_panel_last_time の値を使い､前回の状態を復元する
        is_panel_display: (() => {
            const settings_store = useSettingsStore();
            switch (settings_store.settings.panel_display_state) {
                case 'AlwaysDisplay':
                    return true;
                case 'AlwaysFold':
                    return false;
                case 'RestorePreviousState':
                    return settings_store.settings.showed_panel_last_time;
            }
        })(),

        // ライブ視聴: 表示されるパネルのタブ
        tv_panel_active_tab: useSettingsStore().settings.tv_panel_active_tab,

        // パネルの Twitter タブ内で表示されるタブ
        twitter_active_tab: useSettingsStore().settings.twitter_active_tab,

        // リモコンを表示するか
        is_remocon_display: false,

        // ザッピング（「前/次のチャンネル」ボタン or 上下キーショートカット）によるチャンネル移動かどうか
        is_zapping: false,

        // プレイヤーのローディング状態
        // 既定でローディングとする
        is_loading: true,

        // プレイヤーが映像の再生をバッファリングしているか
        // 視聴開始時以外にも、ネットワークが遅くて再生が一時的に途切れたときなどで表示される
        // 既定でバッファリング中とする
        is_video_buffering: true,

        // プレイヤーの再生が停止しているか
        // 既定で再生中とする
        is_video_paused: false,

        // プレイヤーの背景を表示するか
        // 既定で表示しない
        is_background_display: false,

        // プレイヤーの背景の URL
        background_url: '',

        // キーボードショートカットの一覧のモーダルを表示するか
        shortcut_key_modal: false,

        // ライブ視聴: 現在のライブストリームのステータス
        // 既定で null (未視聴) とする
        live_stream_status: null as 'Offline' | 'Standby' | 'ONAir' | 'Idling' | 'Restart' | null,

        // ライブ視聴: ニコニコ実況への接続に失敗した際のエラーメッセージ
        // null のとき、エラーは発生していないとみなす
        live_comment_init_failed_message: null as string | null,
    }),
    actions: {

        /**
         * PlayerStore の内容を初期値に戻す
         * 視聴画面に入る/離れる際に必ず呼び出すこと
         */
        reset(): void {
            this.recorded_program = IRecordedProgramDefault;
            this.is_virtual_keyboard_display = false;
            this.is_fullscreen = false;
            this.is_control_display = true;
            this.is_panel_display = (() => {
                const settings_store = useSettingsStore();
                switch (settings_store.settings.panel_display_state) {
                    case 'AlwaysDisplay':
                        return true;
                    case 'AlwaysFold':
                        return false;
                    case 'RestorePreviousState':
                        return settings_store.settings.showed_panel_last_time;
                }
            })();
            this.tv_panel_active_tab = useSettingsStore().settings.tv_panel_active_tab;
            this.twitter_active_tab = useSettingsStore().settings.twitter_active_tab;
            this.is_remocon_display = false;
            this.is_zapping = false;
            this.is_loading = true;
            this.is_video_buffering = true;
            this.is_video_paused = false;
            this.is_background_display = false;
            this.background_url = '';
            this.shortcut_key_modal = false;
            this.live_stream_status = null;
            this.live_comment_init_failed_message = null;
        }
    }
});

export default usePlayerStore;
