TOKEN="Fe26.2*1*b073b6179a6f13fdb17193a56b860159e3e3ca56cc401ac68c748668ed8fc9e4*UBhZ9FyzhFaM27henQr9NQ*LLrXC8_2ixPIuEyCxp7izNPB4qjFxLF0Elih2DjalkI*1695267694074*d6ee88fb0fd93eedc9beb689fa9cab92f0f3b64e5b56bf958c66ac595b7c7b29*Vq7yXTfhMpk5G7iTLDh6lk_X_B5938NqG8RpmdoT5kA~2"
URL="https://str.wibudev.com"
case $1 in
    create)
        curl -i -H "Authorization: Bearer $TOKEN" -F 'file=@./makuro-tools.js' $URL/file/create
    ;;
    list)
        curl -s -H "Authorization: Bearer $TOKEN" -X GET  $URL/file/list > list.json
        echo "completed"
    ;;
    lihat)
        curl -H "Authorization: Bearer $TOKEN" -X GET  $URL/file/clm7dfkjl00049u30fde4wbqv.js > apa.js
    ;;
    update)
        node "build.js"
        curl -X POST -H "Authorization: Bearer $TOKEN" -F "file=@./makuro-tools.js" $URL/file/update?id=clm7dfkjl00049u30fde4wbqv
    ;;
    emotion)
        echo "upload emotion"
        curl -i -H "Authorization: Bearer $TOKEN" -F 'file=@./assets/mantine/emotion.txt' $URL/file/create
        echo "upload layout"
        curl -i -H "Authorization: Bearer $TOKEN" -F 'file=@./assets/mantine/layout.txt' $URL/file/create
    ;;
    *)
    echo "Usage: ${0} {comand}" >&2; exit 3;;
esac