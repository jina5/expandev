from django.urls import path, include
from . import views


from .views import KakaoView, KakaoCallBackView

urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('registration', include('dj_rest_auth.registration.urls')),
    path('check-email/<str:email>', views.check_duplicate_email),
    path('check-nickname/<str:nickname>', views.check_duplicate_nickname),
    path('userlist', views.userlist),
    path('userchange', views.userchange),
    path('profile/image', views.set_profile_image),
    path('user/<str:nickname>/profile', views.get_user_profile),
    path('user/<str:nickname>/blogs', views.get_user_blogs),
    path('user/<str:nickname>/roadmaps', views.get_user_roadmaps),
    
    path('login/kakao/', views.kakao_login, name='kakao_login'),
    # path('login/kakao/callback/', views.kakao_callback, name='kakao_callback'),
    # ehapdls:accounts/kakao/
    path('kakao/', KakaoView.as_view()),
    path('kakao/callback/', KakaoCallBackView.as_view()),
]
