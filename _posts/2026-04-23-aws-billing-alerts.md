---
layout: post
title: "AWSで課金事故を防ぐ初期設定｜BudgetsとCloudWatchで通知する"
date: 2026-04-23
tags: ["AWS","無料","Budgets","CloudWatch","請求アラート","初心者"]
---

<p class="toc-title">目次</p>

* Table of Contents
{:toc}

## 1. はじめに {#introduction}

AWSは無料で試すことができますが、設定によっては意図せず課金されることがあります。

この記事では、**課金を防ぐための最低限の設定**として以下を解説します。

- AWS Budgets（予算アラート）
- CloudWatch（請求アラーム）

この2つを設定しておけば、安心してAWSを試せます。

---

## 2. 設定内容 {#conclusion}

今回設定する内容は以下です。

- 0 USDの予算アラート（完全無料チェック）
- 1 USDの予算アラート（保険）
- CloudWatch請求アラーム（ダブルチェック）

👉 この3つで「気づかない課金」はほぼ防げます。

---

## 3. AWS Budgetsで予算アラートを設定する {#budgets}

### 3-1. Budgetsとは

AWS Budgetsは、**利用料金が一定額を超えたら通知してくれる機能**です。


### 3-2. ゼロ支出予算（最重要）

まずは「0 USD」の予算を作成します。以下の手順に沿って設定してください。

#### 手順

1. AWSコンソールで右上アカウント名をクリック > Billing and Cost Managementダッシュボードを開く。

2. 左側メニュー「予算（Budgets）」をクリックする。
<a href="{{ site.baseurl }}/assets/images/aws-billing-alerts1.png" target="_blank">
  <img src="{{ site.baseurl }}/assets/images/aws-billing-alerts1.png" alt="予算Budgets" style="max-width: 90%;">
</a>

3. 「予算を作成」をクリックし、予算タイプを選択ページを表示します。
表示された予算タイプから、
- 予算の設定：テンプレートを使用（シンプル）
- テンプレート：ゼロ支出予算
を選択します。

また、Eメールの受信者欄に、この設定でアラートが通知されることがあった場合に受信したい通知先のメールアドレスを入力します。
<a href="{{ site.baseurl }}/assets/images/aws-billing-alerts2.png" target="_blank">
  <img src="{{ site.baseurl }}/assets/images/aws-billing-alerts2.png" alt="ゼロ支出" style="max-width: 90%;">
</a>

👉 これで「1円でも使ったら通知」が届きます


### 3-3. 1 USD予算（保険）

次に、保険として1ドルの予算も作成します。以下の手順に沿って設定してください。


#### 手順
1. Billing and Cost Managementダッシュボードから、左側メニュー「予算（Budgets）」をクリックする。

2. 「予算を作成」をクリックし、「予算タイプを選択」ページを表示します。
表示された予算タイプから、
- 予算の設定：カスタマイズ（アドバンスト）
- 予算タイプ：コスト予算
を選択し、「次へ」をクリックします。
<a href="{{ site.baseurl }}/assets/images/aws-billing-alerts3.png" target="_blank">
  <img src="{{ site.baseurl }}/assets/images/aws-billing-alerts3.png" alt="コスト予算" style="max-width: 90%;">
</a>


3.「予算を設定」ページが表示されたら、
- 予算名：任意の名前
- 期間：月
- 開始月：デフォルトのまま
- 予算額：1 USD
- 予算の範囲：すべてのAWSのサービス
を入力し、「次へ」をクリックします。
<a href="{{ site.baseurl }}/assets/images/aws-billing-alerts4.png" target="_blank">
  <img src="{{ site.baseurl }}/assets/images/aws-billing-alerts4.png" alt="コスト予算" style="max-width: 90%;">
</a>


4.「アラートの設定」ページが表示されたら、
アラート1に、
- しきい値：予算額の80%
- Eメールの受信者：アラートを通知するメールアドレス

を入力します。
<a href="{{ site.baseurl }}/assets/images/aws-billing-alerts5.png" target="_blank">
  <img src="{{ site.baseurl }}/assets/images/aws-billing-alerts5.png" alt="コスト予算" style="max-width: 90%;">
</a>

また、「アラートのしきい値を追加」をクリックし、以下のアラート2の設定もアラート1と同様に入力します。

- しきい値：予算額の100%
- Eメールの受信者：アラートを通知するメールアドレス


5.「確認」ページで「予算を作成」をクリックして保存します。
<a href="{{ site.baseurl }}/assets/images/aws-billing-alerts6.png" target="_blank">
  <img src="{{ site.baseurl }}/assets/images/aws-billing-alerts6.png" alt="コスト予算" style="max-width: 90%;">
</a>

👉 万が一、0 USDをすり抜けてしまった場合でもこの設定で検知できます

---

## 4. CloudWatchで請求アラームを設定する {#cloudwatch}

### 4-1. CloudWatchとは

CloudWatchはAWSの監視サービスですが、**請求金額のアラーム**も作成できます。


### 4-2. 事前設定

まず以下を有効化します。

1. AWSコンソールで右上のアカウント名をクリック > Billing and Cost Managementダッシュボードを開きます。

2. 左側メニュー「請求設定」をクリックし、請求設定ページを表示します。
<a href="{{ site.baseurl }}/assets/images/aws-billing-alerts4-1.png" target="_blank">
  <img src="{{ site.baseurl }}/assets/images/aws-billing-alerts4-1.png" alt="billingダッシュボード" style="max-width: 90%;">
</a>

3. 請求設定ページのアラート設定欄の「編集」をクリックします。
<a href="{{ site.baseurl }}/assets/images/aws-billing-alerts4-2.png" target="_blank">
  <img src="{{ site.baseurl }}/assets/images/aws-billing-alerts4-2.png" alt="請求設定ページ" style="max-width: 90%;">
</a>

4. アラート設定の以下にチェックをつけて、更新します。
*   AWS無料利用枠アラートを受信する
*   CloudWatch請求アラートを受信する
<a href="{{ site.baseurl }}/assets/images/aws-billing-alerts4-3.png" target="_blank">
  <img src="{{ site.baseurl }}/assets/images/aws-billing-alerts4-3.png" alt="アラート設定" style="max-width: 90%;">
</a>

👉 これをやらないと、この後のCloudWatchで監視する設定ができません。
<br><br>


### 4-3. 請求アラーム作成手順

1. CloudWatchを開く 
⚠️この設定は米国（バージニア北部）リージョンで行ってください。


2. アラームの作成
「アラーム」→「アラームの作成」を選択します
<a href="{{ site.baseurl }}/assets/images/aws-billing-alerts4-4.png" target="_blank">
  <img src="{{ site.baseurl }}/assets/images/aws-billing-alerts4-4.png" alt="アラーム作成" style="max-width: 90%;">
</a>


3. メトリクスの選択

   - Billingを選択します。

     <a href="{{ site.baseurl }}/assets/images/aws-billing-alerts4-5.png" target="_blank">
       <img src="{{ site.baseurl }}/assets/images/aws-billing-alerts4-5.png" alt="Billing" style="max-width: 90%;">
     </a>

   - 概算合計請求額（Total Estimated Charge）を選択します。
     <a href="{{ site.baseurl }}/assets/images/aws-billing-alerts4-6.png" target="_blank">
       <img src="{{ site.baseurl }}/assets/images/aws-billing-alerts4-6.png" alt="Total Estimated Charge" style="max-width: 90%;">
     </a>

   - Estimated Charge USDにチェックを入れて、「メトリクスの選択」ボタンを押します。
     <a href="{{ site.baseurl }}/assets/images/aws-billing-alerts4-7.png" target="_blank">
       <img src="{{ site.baseurl }}/assets/images/aws-billing-alerts4-7.png" alt="Estimated Charge" style="max-width: 90%;">
     </a>



4. メトリクスと条件の指定

   条件で「以上（≧しきい値）」を選択し、「...よりも」の欄に「1」USDと入力し、次へボタンを押します。

     <a href="{{ site.baseurl }}/assets/images/aws-billing-alerts4-8.png" target="_blank">
       <img src="{{ site.baseurl }}/assets/images/aws-billing-alerts4-8.png" alt="条件の指定" style="max-width: 90%;">
     </a>


5. アクションの設定

   通知用に新しいトピックを作成します。

   「新しいトピックの作成」を選択し、通知を受け取るEメールアドレスを入力し、トピックの作成ボタンを押します。

   トピックが作成されたら、次へボタンを押します。

   <a href="{{ site.baseurl }}/assets/images/aws-billing-alerts4-9.png" target="_blank">
     <img src="{{ site.baseurl }}/assets/images/aws-billing-alerts4-9.png" alt="アクションの設定" style="max-width: 90%;">
   </a>

6. アラームの詳細の追加

   任意のアラーム名を入力し、次へボタンを押します。

   確認ページが表示されますので、設定を完了します。

   <a href="{{ site.baseurl }}/assets/images/aws-billing-alerts4-10.png" target="_blank">
     <img src="{{ site.baseurl }}/assets/images/aws-billing-alerts4-10.png" alt="アラームの詳細" style="max-width: 90%;">
   </a>


7. トピックのEメール認証を行う

   5.で入力した通知を受け取るEメールアドレス宛てに、AWSからメールが届きます。

   メール本文のConfirm subscriptionをクリックします。

   <a href="{{ site.baseurl }}/assets/images/aws-billing-alerts4-11.png" target="_blank">
     <img src="{{ site.baseurl }}/assets/images/aws-billing-alerts4-11.png" alt="Eメール認証" style="max-width: 90%;">
   </a>

   認証完了ページが表示され、認証が完了します。
   <a href="{{ site.baseurl }}/assets/images/aws-billing-alerts4-12.png" target="_blank">
     <img src="{{ site.baseurl }}/assets/images/aws-billing-alerts4-12.png" alt="認証が完了" style="max-width: 90%;">
   </a>

### 4-4. 注意点

- ⚠️リージョンは「米国（バージニア北部）」で設定する必要があります。他のリージョンでは請求メトリクスが表示されません  

---

## 5. この設定自体に費用はかかるのか？ {#cost}

これは一番気になるポイントですね。結論から言うと、**今回の構成ならほぼ0円で運用できます。**


### ■ ① 予算（Budgets）

AWS Budgetsには無料枠があります

- 予算：2つまで無料です💡

今回の構成は、
- ゼロ支出予算  
- 1USD予算  
👉 **ちょうど無料範囲内（課金なし）**になります！


### ■ ② CloudWatchアラーム

Amazon CloudWatchも基本無料です。

> ▼ 内訳
> - アラーム：数個なら無料枠内  
> - 請求メトリクス：無料  
> - SNS通知（メール）：無料  

👉 今回の設定なら**ほぼ確実に0円**になります！

---

## 6. 課金対象についての注意点 {#attention}

### ❶ Budgetsを増やしすぎる

3個目以降 → ⚠️少額課金される可能性がありますので注意が必要です


### ❷ CloudWatchを使い込みすぎる

- ログ大量保存  
- カスタムメトリクス大量  

👉 今回の設定ではこのようにはなりません

---

## 7. まとめ {#summary}

- AWSは無料で使えるが、課金されるリスクはあります
- 予算（Budgets）で「0 USD」「1 USD」通知を設定し、万が一課金されてしまった場合に備える
- CloudWatchでもダブルチェックし、万が一課金されてしまった場合に備える
- 今回の設定ならほぼ無料で安心して運用できます

---

## 関連記事

- [AWSでサーバレス最小構成を無料で試してみる]({{ site.baseurl }}/blog/aws-new/)