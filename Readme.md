
# <img width="350" src="https://user-images.githubusercontent.com/39271166/134050201-8110f076-a939-4b62-8c86-7beaa3d4728c.png" alt="KonomiTV">

<img width="100%" src="https://user-images.githubusercontent.com/39271166/153729504-2c047f35-c788-49d2-a088-cc1c3bab3fd0.png"><br>

いろいろな場所とデバイスでテレビと録画を快適に見れる、モダンな Web ベースのソフトウェアです。

ユーザーのさまざまな好みがつまった、温かみのある居心地の良い場を作ってみたいという想いから、KonomiTV と名付けました。  
手元の PC・タブレット・スマホをテレビにすることを考えたときに、まったく新しく、使いやすくて快適な視聴体験を創出したいという想いから開発しています。

計画はかなり壮大ですが、現時点ではテレビをリアルタイムで視聴できる「テレビをみる」と、設定画面のみが実装されています。  
将来的には、録画した番組を Netflix をはじめとした配信サイトのような UX で快適に視聴できる「ビデオをみる」など、多くの機能を追加予定です。

## 設計思想

いわゆる TS 抜きでテレビを見ている人の多くが、TVTest でテレビを見て、録画をファイルベースで管理して、録画ファイルをメディアプレイヤーで開いて…といった、ファイルやアーキテクチャベースの視聴の仕方をされているかと思います。  
ですが、その中で必ず出てくる BonDriver を選択したり、ファイルをフォルダの中から探しだして選択したり、1話を見終わったから2話を開き直したりといった手間は、本来その番組を視聴し、心いくまで楽しむにあたって、不要な工程ではないかと考えます。雑念、といったほうが分かりやすいでしょうか。  

一方世間のトレンドに目を向けてみると、Netflix や Amazon Prime Video のような配信サイトが幅を利かせています。  
これらのサイトが流行っているのは、（良い意味で）何も考えなくても、いつでもどこでも気軽に快適に映像コンテンツを見まくれる、そんなユーザー体験が実現されているからです。  
配信サイトとテレビ・録画は「リアルタイムで配信されている」「事前に選んだコンテンツしか視聴できない」など大きな差異もありますが、映像コンテンツを視聴するインターフェイスという点では共通しています。  
そこで、テレビと録画の視聴といういまだレガシーな視聴体験が残っている分野に、優れた UX を実現している配信サイトでの概念を取り入れ、まるで自分だけの Netflix のような視聴体験を演出できれば面白いのではないか？と考えました。その仮説と理想を実現すべく、鋭意開発を続けています。

こうした考えから、設計思想として「映像コンテンツを視聴し楽しむ」ために不要な概念や操作を可能なかぎり表層から排除・隠蔽し、ユーザーが本当の目的以外の雑念に気を取られないようなシステムを目指しています。

たとえば TVRemotePlus であった「ストリーム」の概念を KonomiTV では排しています。チャンネルをクリックするだけですぐに視聴できるほか、裏側ではチューナーの共有、同じチャンネルを複数のデバイスで見ているなら自動的に共聴するといった高度な仕組みも備え、ユーザーがストレスなく視聴できるように設計されています。  
画質の切り替えの UI も、KonomiTV では多くの動画サイトと同じようにプレイヤー内に統合されています。裏側では毎回エンコーダーを再起動しているのですが、表層からはあたかも事前に複数の画質が用意されているかのように見えるはずです。  
一般的な PC で動かす以上使えるリソースには限界がありますし、全てにおいて Netflix のような機能を実装できるわけではありません。それでも使えるリソースの範囲で最大限使いやすいソフトウェアにしていければと、細部に様々な工夫を取り入れています。

当然ながら表に泥臭い処理を見せないようにしている分、裏側の実装がそれなりに大変です。細かいところまで調整しているとかなりの手間がかかります。  
それでも私が頑張れば私を含めたユーザーの視聴体験が向上するわけで、必要な犠牲かなと思っています。

<img width="100%" src="https://user-images.githubusercontent.com/39271166/153728271-e4726109-9b60-4c70-b434-233c68a48454.png"><br>

## 備考・注意事項

- 現在 β 版で、まだ実験的なプロダクトです。当初よりかなり安定してきましたが、まだ保証ができる状態ではありません。
  - まだ安定しているとは言えませんが、それでも構わない方のみ導入してください。
  - 使い方などの説明も用意できていないため、自力でトラブルに対処できるエンジニアの方以外には現状おすすめできません。
  - 今後インストーラーを開発予定ですが、後述の通り現時点ではインストール方法がかなり煩雑になっています。他の環境でちゃんと動作するのかさえも微妙です。
  - 完成予想はおろか、TVRemotePlus で実装していた機能に関してもまだ完全にカバーできていないため、現時点で TVRemotePlus を代替できるレベルには達していません。
- TVRemotePlus の後継という位置づけのソフトですが、それはあくまで「精神的な」ものであり、実際の技術スタックや UI/UX は完全に新規で設計されています。
  - 確かに TVRemotePlus の開発で得られた知見を数多く活用していますし開発者も同じではありますが、ユーザービリティや操作感は大きく異なると思います。
  - TVRemotePlus の技術スタックでは解決不可能なボトルネックを根本的に解消した上で、「同じものを作り直す」のではなく、ゼロから新しいテレビ視聴・録画視聴のユーザー体験を作り上げ、追求したいという想いから開発しています。
  - どちらかというと録画視聴機能の方がメインの予定でいますが、前述のとおり、現時点ではテレビのライブ視聴機能のみの実装です。構想は壮大ですが、全て実装し終えるには年単位で時間がかかるでしょう。
- 今のところ、スマホ・タブレットは横画面表示のみ対応しています。将来的には縦画面でも崩れずに表示できるようにする予定です。
  - タブレットは Fire HD 10 (2021), iPad mini 4, iPad mini 6 で動作することを確認済みです。
  - スマホ（横画面）は実験的なもので、今後 UI が大幅に変更される可能性があります。
  - iPhone は Media Source Extensions API に対応していないため、現時点では動作しません。
    - 今後 LL-HLS 再生モードを実装する予定ですが、私が iPhone を常用していない事もあり、実装時期は未定です。
    - また、iPad でホーム画面に追加したアイコンから単独アプリのように起動した場合も (PWA)、同様に動作しません。
- 今後、開発の過程で設定や構成が互換性なく大幅に変更される可能性があります。
- ユーザービリティなどのフィードバック・不具合報告・Pull Requests (PR) などは歓迎します。
  - 技術スタックはサーバー側が Python + [FastAPI](https://github.com/tiangolo/fastapi) + [Tortoise ORM](https://github.com/tortoise/tortoise-orm) + [Uvicorn](https://github.com/encode/uvicorn) 、クライアント側が Vue.js + [Vuetify](https://github.com/vuetifyjs/vuetify) の SPA です。
    - Vuetify は補助的に利用しているだけで、大部分は独自で書いた SCSS スタイルを適用しています。
  - コメントを多めに書いたりそれなりにきれいにコーディングしているつもりなので、少なくとも TVRemotePlus なんかよりかは読みやすいコードになっている…はず。
  - 他人が見るために書いたものではないのであれですが、一応自分用の [開発資料](https://mango-garlic-eff.notion.site/KonomiTV-90f4b25555c14b9ba0cf5498e6feb1c3) と [DB設計](https://mango-garlic-eff.notion.site/KonomiTV-544e02334c89420fa24804ec70f46b6d) 的なメモを公開しておきます。もし PR される場合などの参考になれば。

## 動作環境

### サーバー

- **Windows PC または Linux PC**
  - Windows 10 Pro と Ubuntu 20.04 LTS で動作確認を行っています。
  - RedHat 系 OS でも動くかもしれませんが、環境がないためサポートはできません。
  - Linux PC の場合は Docker で動かすこともできます（後述）。
  - ARM 向けのサードパーティーライブラリの実行ファイルを同梱していないため、ラズパイなどの ARM の Linux PC では今のところ動きません。
- **Python 3.9**
  - 現時点ではシステムに Python 3.9 がインストールされている必要があります。Embeddable Python を使い、将来的には Windows では Python のインストールを不要にする予定です。
  - asyncio（非同期処理）を多用しているため、Python 3.8 以前ではまともに動かない可能性が高いです。
- **EDCB または Mirakurun**
  - バックエンドには EDCB または Mirakurun を選択できます。
  - **Mirakurun は 3.9.0 以降を推奨します。** 3.8.0 以前でも動作しますが、おすすめはしません。
    - リバースプロキシなどで Mirakurun に Basic 認証が掛かっていると正常に動作しません。
  - **EDCB は 220122 以降の [xtne6f 版 EDCB](https://github.com/xtne6f/EDCB) 、または [tkntrec 版 EDCB](https://github.com/tkntrec/EDCB) が必須です。**
    - 220122 以前のバージョンではテレビのライブストリーミングに失敗します。
    - KonomiTV と連携するには、EDCB 側に事前の設定が必要です（後述）。

### クライアント

- **PC: Microsoft Edge または Google Chrome**
  - Firefox でも動作するはずですが、コメント描画が重いため、コメント表示をオンにするとライブストリーミングが時折止まることが確認されています。動作確認もあまりできていないため、おすすめしません。
  - Mac の Safari はサポートしません。Mac でも Chrome か Edge を使ってください。
- **Android: Google Chrome**
  - Android の Firefox は動作確認を行っていません。
  - 現時点では横画面表示のみの対応です。縦画面表示ではレイアウトが崩れます。
- **iPadOS: Safari（暫定対応）**
  - あまり動作確認を行っていないため、修正できていない不具合があるかもしれません。
  - PWA モードでは Safari 側のバグにより、テレビのライブストリーミングに失敗します。
  - 前述のとおり、iOS Safari への対応は当面の間行いません。

<img width="100%" src="https://user-images.githubusercontent.com/39271166/153729029-bbcd6c16-9661-4f61-b7a9-64df8c1e4586.png"><br>

## 事前準備

### ドライバ

必須ではありませんが、Windows で PLEX 製チューナーを利用している場合は、事前にドライバを [px4_drv for WinUSB](https://github.com/tsukumijima/px4_drv) に変更しておくことを推奨します。  
px4_drv では公式ドライバと比べてチューナーの起動時間が大幅に短縮されています。その分 KonomiTV での視聴までにかかる待機時間も速くなるため（5秒以上速くなる）、より快適に使えます。  

px4_drv を導入すると、ほかにもドロップが大幅に減って動作が安定するなどの多くのメリットがあります。  
内蔵カードリーダーが使えないこと、BonDriver の差し替えが必要になることだけ注意してください。

### EDCB の事前設定

**EDCB バックエンドを使う場合、いくつか EDCB に事前の設定が必要です。**

EpgTimer を開き、[設定] → [動作設定] → [全般] から、[EpgTimerSrv の設定画面を開く] をクリックして、EpgTimerSrv の設定画面を表示します。  
その後、以下のとおりに設定してください。

- **[その他] → [視聴に使用する BonDriver] に BonDriver を追加する（重要）**
  - EDCB に登録している BonDriver のうち、ここで設定した BonDriver だけが KonomiTV での視聴に利用されます。
  - 視聴に使用する BonDriver がすべて録画に使われているときは、KonomiTV からは視聴できません（チューナー不足と表示されます）。
  - また、KonomiTV での視聴中に録画が開始されると、その時点でチューナー数が足りない場合は KonomiTV 向けの放送波の配信が停止され、録画予約のチューナータスクを優先します。
- **[その他] → [ネットワーク接続を許可する (EpgTimerNW 用)] にチェックを入れる**
  - リモート PC の KonomiTV から EDCB にアクセスする場合は、[アクセス制御] の項目でリモート PC のローカル IP アドレスの範囲を設定してください。
    - ローカル IP アドレスの範囲はコンマ (,) 区切りで複数設定できます。
  - たとえばリモート PC のローカル IP アドレスが `192.168.1.12` なら、`+192.168.1.0/24` のように追記します。 
- **xtne6f 版 EDCB の場合、[その他] → [EpgTimerSrv の応答を tkntrec 版互換にする (要再起動)] にチェックを入れる**
  - EDCB から局ロゴを取得する際に必要です。
  - tkntrec 版 EDCB では既定で有効になっています（設定項目自体がありません）。

また、EpgDataCap_Bon にも設定が必要です。

**EpgDataCap_Bon を開き、[設定] → [ネットワーク設定] → [TCP送信] から、[SrvPipe] を選択して [追加] ボタンをクリックしてください。**  
送信先一覧に `0.0.0.1:0-29 (SrvPipe)` と表示されていれば OK です。

>SrvPipe とは、EpgDataCap_Bon で受信した放送波を EpgTimerSrv に渡すための、特殊な名前付きパイプのことです。KonomiTV は SrvPipe を経由して EDCB から放送波を受信しています。  
> そのため、この設定を忘れるとテレビのストリーミングができなくなります。

このほか、EpgTimerSrv.exe にファイアウォールが掛かっていると EDCB に接続できません。適宜ファイアウォールの設定を変更し、EDCB に接続できるようにしてください。

0.4.0 以前は EDCB と KonomiTV が同じ PC で動いている必要がありましたが、EDCB のアップデートにより、EDCB と KonomiTV が別の PC で動いていても連携できるようになりました。  
Linux PC で起動した KonomiTV から EDCB と連携することもできるはずです。

### 局ロゴ

KonomiTV には、放送波から取得できるものよりも遥かに高画質な局ロゴが同梱されています。  
ほとんどの地上波チャンネル・BS/CS の全チャンネル・一部の CATV のコミュニティチャンネルをカバーしており、受信できるチャンネルに対応する局ロゴが同梱されていれば、それが利用されます。

> 放送波から取得できる局ロゴは最高でも 64x36 で、現代的なデバイスで見るにはあまりにも解像度が低すぎます。とはいえ、局ロゴがなければぱっとチャンネルを判別できなくなり、ユーザー体験が悪化してしまいます。  
> さらに、局ロゴは何らかの事情で取得できていないことも考えられます。こういった事情もあり、高画質な局ロゴを同梱している次第です。

チャンネルに対応する局ロゴが同梱されていない場合は、Mirakurun・EDCB のいずれかから局ロゴの取得を試みます。  

Mirakurun バックエンドを利用している場合は、Mirakurun の API から局ロゴの取得を試みます。  
最近の Mirakurun であれば、何もしなくても局ロゴが収集されているはずです。

EDCB バックエンドを利用している場合は、EDCB のロゴデータ保存機能で収集された局ロゴの取得を試みます。  
EpgDataCap_Bon の設定 → [EPG取得設定] → [ロゴデータを保存する] にチェックが入っていて、なおかつ `EDCB/Settings/LogoData/` にロゴデータ (PNG) が保存されていることが条件です。

Mirakurun または EDCB から局ロゴを取得できなかった場合は、デフォルトの局ロゴが利用されます。  

> 同梱されているロゴは `server/data/logo/` に `NID(ネットワークID)-SID(サービスID).png` として、256×256 のフォーマットで保存されています。  
> チャンネルのネットワーク ID とサービス ID がわかっていれば、自分で局ロゴ画像を作ることも可能です。

<img width="100%" src="https://user-images.githubusercontent.com/39271166/153729193-7a616b29-d437-45dd-bafc-f930b56dd580.png"><br>

## インストール方法（暫定）

以下は暫定的なインストール方法です。将来的にはインストーラーでインストールできるようにする予定ですが、現時点では煩雑な手順になっています。  
すべての環境でこの通りに進めて動くとは限りません。保証もできないので、すべて自己責任のもとでお願いします。

動作環境にあるとおり、**事前に Python 3.9 と pip がインストールされている事を前提とします。**  
また、Git コマンドが使える状態になっている必要があります。

> Microsoft ストアからインストールした Python では確実にまともに動作しません。

> Windows の場合、インストール先をデフォルトの AppData 以下にするとそのユーザーしか使えなくなってしまいますが、とはいえ `C:\Program Files` 以下にインストールするとパッケージのインストールに管理者権限が必要になってしまい厄介です。  
> Python は管理者権限が不要で `C:\Users` 以下でないフォルダにインストールすることを推奨します。個人的には `C:\Applications\Python\Python3.9` あたりがおすすめです。

以下の手順では Windows では `C:\Develop` 、Linux では `/Develop` フォルダが作成されているものとして、`C:\Develop` または `/Develop` フォルダ以下にインストールするようになっています。  
もし他のフォルダにインストールしたい場合は適宜読み替えてください。

以下はほとんどコマンドメモです。詳細な解説はありませんし、開発者向けです。  
**Windows では PowerShell にて実行してください。**<s>cmd.exe? 今すぐ窓から投げ捨てろ</s>

### Docker で構築する

あまり動作確認は取れていませんが、Docker で構築することもできます。あらかじめ、Docker と Docker Compose がインストールされた環境が必要です。

ハードウェアエンコーダー (QSVEncC・NVEncC・VCEEncC) は Docker 上でも利用できます。ただし、ホスト OS が Linux である必要があるほか、あらかじめホスト OS に後述の GPU ドライバがインストールされている必要があります。  
VCEEncC に関しても対応済みのつもりですが、手元に環境がないため、実際に動作するかどうかは検証できていません。

事前に、後述の設定ファイルの編集を行ってください。最低でも config.yaml が存在する状態にしておく必要があります。

あとは他のソフトウェアと同様に、`docker-compose up` を実行するだけで、KonomiTV のサーバーが起動します。他のインストール手順は実行不要です。  
バックグラウンドで常時起動させたいときは、`docker-compose up -d` と実行してください。

### 1. pipenv のインストール

pipenv は pip の環境を仮想化してくれるツールです。  
pipenv を使えばパッケージをプロジェクトローカルにインストールできるので、依存関係の衝突などを気にする必要がありません。

```
python -m pip install pipenv  # Windows
python3.9 -m pip install pipenv  # Linux
```

### 2. KonomiTV 本体のインストール

**現時点では、Git で最新の release ブランチを取得することを推奨します。** release ブランチにはリリース済みの安定した変更のみが適用されます。  
主にリリース時に更新されるので、定期的に `git pull` で最新化しておくことをおすすめします。

master ブランチは開発ブランチです。新しい機能をいち早く試せる反面、開発中の変更も多く含まれるため、安定する保証はありません。  
また、サードパーティーライブラリの更新に依存する変更が行われることもあるため、サードパーティーライブラリを自分で更新する必要が出てくるかもしれません。

クライアントは、リリース時や実装上のきりが良いときに `client/dist/` にあるビルド済みのファイルを更新しています。  
まだビルド済みのファイルに反映されていない変更を試してみたいときは、`client/` フォルダで `yarn build` を実行するか、`yarn dev` で開発サーバーを起動させてください（後述）。

#### Windows

```
cd C:\Develop
git clone https://github.com/tsukumijima/KonomiTV.git
cd C:\Develop\KonomiTV\server
git switch release
```

#### Linux

```
cd /Develop
git clone https://github.com/tsukumijima/KonomiTV.git
cd /Develop/KonomiTV/server
git switch release
```

### 3. サードパーティーライブラリのインストール

KonomiTV では、FFmpeg・QSVEncC・NVEncC・VCEEncC の各エンコーダーと、[tsreadex](https://github.com/xtne6f/tsreadex) という放送波の MPEG2-TS ストリームを安定させるためのツールをサードパーティーのライブラリとして利用しています。

> 各自でダウンロードするようにしていないのは、インストールが簡単になるうえ、エンコーダーのバージョンや導入方法の違いによる諸々のエラーやそれによるサポート作業を回避できるという理由が大きいです。

TVRemotePlus ではバイナリごと Git の管理下に含めていましたが、KonomiTV ではバージョン情報のみを管理する方針としています。  
将来的にはインストーラー側で自動ダウンロード/アップデートするようにしたいところですが、現時点では手動でのダウンロードと配置が必要です。

Linux 向けの実行ファイルも同梱しています。拡張子は `.elf` です。  
Linux (Ubuntu 20.04 LTS x64) で動作することを確認しました。

> なお、Linux で QSVEncC・NVEncC・VCEEncC を使う場合は、別途 FFmpeg (libav) ライブラリと、それぞれ [Intel Media Driver](https://github.com/rigaya/QSVEnc/blob/master/Install.ja.md#linux-ubuntu-2004) / [NVIDIA Graphics Driver](https://github.com/rigaya/NVEnc/blob/master/Install.ja.md#linux-ubuntu-2004) / [AMD Driver](https://github.com/rigaya/VCEEnc/blob/master/Install.ja.md#linux-ubuntu-2004) のインストールが必要です。  
> VCEEncC の Linux サポートはつい最近追加されたばかりなので、安定してエンコードできるかは微妙です（動かせる環境がない…）。

**[こちら](https://github.com/tsukumijima/KonomiTV/releases/download/v0.5.0/thirdparty.7z) からサードパーティーライブラリをダウンロードし、`server/thirdparty/` に配置してください。** 展開後のサイズは 600MB あるので注意。  

7-Zip か p7zip のコマンドライン版が利用できる場合は、コマンドラインでダウンロードと展開を行うこともできます。

```
curl -LO https://github.com/tsukumijima/KonomiTV/releases/download/v0.5.0/thirdparty.7z
7z x -y thirdparty.7z
rm thirdparty.7z
```

**Windows では、`C:\Develop\KonomiTV\server\thirdparty\FFmpeg` に `ffmpeg.exe` がある状態になっていれば OK です。**

**Linux では、`/Develop/KonomiTV/server/thirdparty/FFmpeg` に `ffmpeg.elf` がある状態でかつ、実行ファイルが実行権限を持っている必要があります。**  
以下のコマンドを実行して、実行権限を付与してください。

```
chmod 755 ./thirdparty/FFmpeg/ffmpeg.elf
chmod 755 ./thirdparty/FFmpeg/ffprobe.elf
chmod 755 ./thirdparty/QSVEncC/QSVEncC.elf
chmod 755 ./thirdparty/NVEncC/NVEncC.elf
chmod 755 ./thirdparty/tsreadex/tsreadex.elf
chmod 755 ./thirdparty/VCEEncC/VCEEncC.elf
```

このほか、Linux では FFmpeg の実行に libv4l-dev パッケージが必要です（インストールされていないと FFmpeg が実行できないみたいです）。  
お使いの環境にインストールされていない場合は、あわせてインストールしてください。

```
sudo apt install -y libv4l-dev
```

### 4. 依存パッケージのインストール

**`pipenv sync` を実行し、KonomiTV が依存するパッケージをインストールしてください。**  
事前に `PIPENV_VENV_IN_PROJECT` 環境変数を定義してから実行してください。さもなければ、パッケージや仮想環境がまったく別のフォルダにインストールされてしまいます。

#### Windows

```
# pipenv のパッケージを直下に保存する環境変数を定義
# これをつけないと ~/.virtualenvs/ に置かれてしまい面倒
$env:PIPENV_VENV_IN_PROJECT = "true"
pipenv sync
```

#### Linux

```
# pipenv のパッケージを直下に保存する環境変数を定義
# これをつけないと ~/.local/share/virtualenvs/ に置かれてしまい面倒
export PIPENV_VENV_IN_PROJECT="true"
pipenv sync
```

### 5. データベースのアップグレード

[Aerich](https://github.com/tortoise/aerich) という Tortoise ORM のマイグレーションツールを使っています。  

**以下のコマンドを実行して、データベースを更新してください。** まだデータベースが存在していない場合は、このタイミングで作成されます。  
データベース構造が変更されるたびに、このコマンドを再実行する必要があります。

```
pipenv run aerich upgrade
```

よくわからないエラーが出てうまくアップグレードできないときは、一旦データベースを削除してからもう一度実行するとうまくいくことがあります。  
今のところデータベースには再生成できるデータ（チャンネル情報・番組情報）しか保存されていないので、削除することによる影響はありません。

```
rm ./data/database.sqlite
pipenv run aerich upgrade
```

<img width="100%" src="https://user-images.githubusercontent.com/39271166/153728655-afe25279-2d42-4150-bfdf-71de62dde44d.jpg"><br>

### 6. 設定ファイルの編集

ここまで手順通りにやっていれば Readme.md のあるフォルダに config.example.yaml があるはずなので、**同じ階層に config.yaml としてコピーします。**  
設定ファイルは YAML ですが、JSON のようなスタイルで書いています。括弧がないとわかりにくいと思うので…

> JSON は YAML のサブセットなので、実は JSON は YAML として解釈可能です。

#### バックエンドの設定

**Mirakurun をバックエンドとして利用する場合は、Mirakurun の HTTP API の URL をお使いの録画環境に合わせて編集してください。**

通常、HTTP API の URL は `http://(MirakurunのあるPCのIPアドレス):40772/` になります。接続できない際は、Mirakurun が起動しているかを確認してみてください。

**EDCB をバックエンドとして利用する場合は、EDCB (EpgTimerNW) の TCP API の URL をお使いの録画環境に合わせて編集してください。**

通常、TCP API の URL は `tcp://(EDCBのあるPCのIPアドレス):4510/` になります。接続できない際は、ファイアウォールの設定や EpgTimer Service が起動しているかを確認してみてください。  
前述のとおり、あらかじめ EDCB の事前設定を済ませておく必要があります。

> TCP API の URL として `tcp://edcb-namedpipe/` と指定すると、TCP API の代わりに名前付きパイプで通信を行います。

他にも設定項目がありますが、下記のエンコーダーの設定を除いて、ほとんど変更する必要はありません。  
設定ファイルの変更を反映するにはサーバーの再起動が必要です。  

#### エンコーダーの設定

エンコーダーには、ソフトウェアエンコーダーの FFmpeg のほか、ハードウェアエンコーダーの QSVEncC・NVEncC・VCEEncC を選択できます。  
**ハードウェアエンコーダーを選択すると、エンコードに GPU アクセラレーションを利用するため、CPU 使用率を大幅に下げる事ができます。**  
エンコード速度も高速になるため、お使いの PC で利用可能であれば、できるだけハードウェアエンコーダーを選択することを推奨します。

> お使いの PC で選択したハードウェアエンコーダーが利用できない場合、その旨を伝えるエラーメッセージが表示されます。  
> まずはお使いの PC でハードウェアエンコーダーが使えるかどうか、一度試してみてください（設定ファイルの変更後はサーバーの再起動が必要です）。

> 前述のとおり、Linux 環境で QSVEncC・NVEncC・VCEEncC を利用する場合は、別途 GPU ドライバのインストールが必要です。

**QSVEncC は、Intel 製 CPU の内蔵 GPU に搭載されているハードウェアエンコード機能 (QSV) を利用するエンコーダーです。**  
ここ数年に発売された Intel Graphics 搭載の Intel 製 CPU であれば基本的に搭載されているため、一般的な PC の大半で利用できます。内蔵 GPU にも関わらず高速で、画質も良好です。  

**NVEncC は、Geforce などの NVIDIA 製 GPU に搭載されているハードウェアエンコード機能 (NVENC) を利用するエンコーダーです。**  
高速で画質も QSV より若干いいのですが、Geforce では同時にエンコードが可能なセッション数が 3 に限定されているため、同時に 3 チャンネル以上視聴することはできません。  
同時に 4 チャンネル以上視聴しようとした場合、KonomiTV では「NVENC のエンコードセッションが不足しているため、ライブストリームを開始できません。」というエラーメッセージが表示されます。

**VCEEncC は、Radeon などの AMD 製 GPU に搭載されているハードウェアエンコード機能 (AMD VCE) を利用するエンコーダーです。**  
QSVEncC・NVEncC に比べると安定せず、利用者も少ないため安定稼働するかは微妙です。QSVEncC・NVEncC が使えるならそちらを選択することをおすすめします。

なお、config.yaml が存在しなかったり、設定項目が誤っていると後述のサーバーの起動の時点でエラーが発生します。  
その際はエラーメッセージに従い、config.yaml の内容を確認してみてください。

### 7. サーバーの起動

**KonomiTV のアプリケーションサーバーを起動します。**  
現時点ではポート番号は固定で、ポート 7000 を使いリッスンします。  
あらかじめ、ファイアウォールの設定でポート 7000 が開放されているかを確認してください。

```
pipenv run serve
```

**起動してみて、何もエラーなく `Application startup complete.` と表示されていれば、インストールは完了です！**  
ブラウザで http://localhost:7000/ にアクセスすると、KonomiTV のホーム画面が表示されるはずです。

初回起動時は Mirakurun または EDCB から7日間分の番組情報をすべて取得してデータベースに保存するため、起動に30秒以上かかります。  
次回以降は差分のみをデータベースに保存・削除するので、最高でも10秒もすれば起動します。  
番組情報の更新は今のところ15分に一度、バックグラウンドで自動的に行われます。ログにも出力されているはずです。

API ドキュメント (Swagger) は http://localhost:7000/api/docs にあります。  
リンクはいろいろありますが、ほとんどがまだ未着手のため Not Found になっています。テレビのライブ視聴機能だけで見ても、まだ実装できていない箇所が多いです。

とはいえ最低限視聴できる状態にはなっているはずです。まずは使ってみて、もしよければ感想をお聞かせください。

<img width="100%" src="https://user-images.githubusercontent.com/39271166/153728574-e9ea2938-89ca-4f0d-81f4-3987b08adcf2.png"><br>

## 開発者向け情報

### サーバー

Uvicorn は ASGI サーバーで、FastAPI で書かれた KonomiTV のアプリケーションサーバーを実行します。  
また、KonomiTV の場合は静的ファイルを配信する Web サーバーの役割も兼ねています。

開発時などでサーバーをリロードモード（コードを変更すると自動でサーバーが再起動される）で起動したいときは、`pipenv run dev` を実行してください。  
コードを変更すると強制的にサーバーが再起動されるため、サーバーを終了するタイミングによっては EDCB のチューナーが終了されないままになることがあります。

### クライアント

クライアントは Vue.js の SPA (Single Page Application) で構築されており、コーディングとビルドには少なくとも Node.js が必要です。  
Node.js v14, npm v7, yarn v1 で開発しています。

クライアントのデバッグは `client/` フォルダにて `yarn dev` または `npm run dev` を実行し、http://localhost:7001/ にてリッスンされる開発用サーバーにて行っています。  

> 事前に `yarn install` を実行し、依存するパッケージをインストールしておいてください。  
> 以前は npm を使っていたのですが、GitHub からのパッケージの更新がなぜかかなり重いため、yarn に変更しました。パッケージのインストールは遅いですが、npm を使ってビルドすることもできます。

`yarn dev` でリッスンされる開発サーバーでは、コードすると自動的に差分が再ビルドされます。  
API サーバーは別のポート (7000) でリッスンされているので、開発サーバーでのみ API のアクセス先を `http://(サーバーと同じホスト名):7000/` に固定しています。

クライアントの静的ファイルは、`client/dist/` に配置されているビルド済みのものをサーバー側で配信するように設定されています。  
そのため、`yarn build` でクライアントのビルドを更新したのなら、サーバー側で配信されるファイルも同時に更新されることになります。

## License

[MIT License](License.txt)
