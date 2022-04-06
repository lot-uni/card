require 'bundler/setup'
Bundler.require
require 'sinatra/reloader' if development?
require './models/combu.rb'
require 'pony'

get '/' do
  erb :index
end

get '/Issue_form' do
  erb :Issue_form
end

post '/send' do
  if Card.where(email: params[:email]).first.nil? || Card.where(email: params[:email]).first.authc == false
    Card.create(
      name: params[:name],
      email: params[:email],
      address: params[:address],
      birth: params[:birth],
      md5: params[:user_hash].to_s(),
      password: SecureRandom.urlsafe_base64(5)
    )
    redirect '/send_verification/' + params[:user_hash].to_s()
  else
    redirect '/Issue_form'
  end
end

# get '/admin' do
#   @cards = Card.all
#   erb :admin
# end

get "/send_verification/:hash" do
  @card = Card.where(md5: params[:hash]).first
  @email = @card.email
  Pony.mail(
    :from => 'lot.uni.qiita@gmail.com',
    :to => @email,
    :subject => "combuカード認証メール",
    :html_body => 'このメールはcombuカード認証のためのメールです。<br>認証を完了したい場合は以下のリンクをクリックして下さい<a href="https://card.combu.dev/auth/'+@card.md5+'/'+@card.password+'">https://card.combu.dev/auth/'+@card.md5+'/'+@card.password+'</a>',
    :via => :smtp,
    :via_options => { 
      :address             => 'smtp.gmail.com', 
      :port                 => '587', 
      :user_name            => 'lot.uni.qiita@gmail.com', 
      :password             => 'svkbscajvjnngfdz', 
      :authentication       => :plain,
      :enable_starttls_auto => false,
      :openssl_verify_mode  => OpenSSL::SSL::VERIFY_NONE
  })
  erb :mail_send
end

get '/auth/:md5/:password' do
  if !Card.where(md5: params[:md5]).first.nil?
    @card = Card.where(md5: params[:md5]).first
    if @card.password == params[:password] && Card.where(authc: true).where(email: @card.email).first.nil?
      @card.update(status: "認証済")
      @card.update(authc: true)
    end
    if @card.password == params[:password] && !Card.where(authc: true).where(email: @card.email).first.nil?
      "このメールアドレスはすでに使われています。"
    end
    if @card.password == params[:password]&&@card.authc == true
      @cards = Card.where(md5: params[:md5]).first
      erb :show_status
    else
      "無効な認証リンクです。"
    end
  else
    "無効な認証リンクです。"
  end
end