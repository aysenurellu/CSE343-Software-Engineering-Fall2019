Q1 - Bizden script istediklerinde scripti nasıl döneceğiz?
A1 - op=get_script yok. Bizden script istemeyecekler, operasyonlar arasında bu yok. (Plan grubundan gelen bilgiye göre.)

Q2 - Script yoksa nasıl hata vereceğiz?
A2 - op=get_script yok.

Q3 - Yeni script geldiğinde scripti versiyonladıysak ne döneceğiz?
A3 - Versiyonladığımız zaman Plan grubuna json dosyasını ('result'=true) göndereceğiz. Trello'da gösterecekler.

Q4 - Versiyonlanmadıysa ne döneceğiz?
A4 - Versiyonlamadığımız zaman Plan grubuna json dosyasını ('result') göndereceğiz. Trello'da gösterecekler.

Notlar:
-Python 2.7'de test edildi. 
-Kullandığımız JSON parametreleri: {destination, origin, op, project_path, project_name, reminder, result, repository_url, github_login, github_password}
