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

## 2. 先に結論（この設定でほぼ安心） {#conclusion}

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

次に、1ドルの予算も作成します。以下の手順に沿って設定してください。


#### 手順
1. Billing and Cost Managementダッシュボードから、左側メニュー「予算（Budgets）」をクリックする。

2. 「予算を作成」をクリックし、予算タイプを選択ページを表示します。
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


5.「確認」ページで設定した内容を確認し、「予算を作成」をクリックして保存します。
<a href="{{ site.baseurl }}/assets/images/aws-billing-alerts6.png" target="_blank">
  <img src="{{ site.baseurl }}/assets/images/aws-billing-alerts6.png" alt="コスト予算" style="max-width: 90%;">
</a>
👉 万が一、0 USDをすり抜けてもこの設定で検知できます

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
2. 「アラーム」→「アラームの作成」  
3. メトリクス選択  
   - Billing → Total Estimated Charge  
4. 通貨：USD  
5. しきい値：1 USD  
6. SNSでメール通知設定  



### 4-4. 注意点

- リージョンは「US East (N. Virginia)」で設定する必要があります  
- 他のリージョンでは請求メトリクスが表示されません  

---

## 5. この設定自体に費用はかかるか？ {#cost}

これは一番気になるポイントですね。結論から言うと、**今回の構成ならほぼ0円で運用できます。**


### ■ ① 予算（Budgets）

AWS Budgets

👉 無料枠あり

- 予算：2つまで無料です

今回の構成：

- ゼロ支出予算  
- 1USD予算  

👉 **ちょうど無料範囲内（課金なし）**


### ■ ② CloudWatchアラーム

Amazon CloudWatch

👉 これも基本無料です

> ▼ 内訳

> - アラーム：数個なら無料枠内  
> - 請求メトリクス：無料  
> - SNS通知（メール）：無料  

👉 今回の設定なら👇  
👉 **ほぼ確実に0円**

---

## 6. 注意（ここだけ知っておけばOK） {#attention}

### ❶ Budgetsを増やしすぎる

3個目以降 → 少額課金

👉 今回は2個なので問題なし


### ❷ CloudWatchを使い込みすぎる

- ログ大量保存  
- カスタムメトリクス大量  

👉 今回の用途では関係なし

---

## 7. まとめ {#summary}

- AWSは無料で使えるが、課金リスクはある  
- Budgetsで「0 USD」「1 USD」通知を設定  
- CloudWatchでダブルチェック  
- 今回の設定ならほぼ無料で安心運用できる  

---

## 関連記事

- [AWSでサーバレス最小構成を無料で試してみる]({{ site.baseurl }}/blog/aws-new/)