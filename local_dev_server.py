import http.server
import socketserver
import webbrowser
import threading
import time

PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler

def open_browser():
    time.sleep(1)
    webbrowser.open(f"http://localhost:{PORT}")

if __name__ == "__main__":
    # 브라우저를 자동으로 열어주는 쓰레드 실행
    threading.Thread(target=open_browser, daemon=True).start()

    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("\n" + "="*50)
        print(f" 🚀 로컬 개발 서버 구동 완료!")
        print(f" 👉 주소: http://localhost:{PORT}")
        print(f" 👉 종료하려면 터미널에서 [Ctrl + C]를 누르세요.")
        print("="*50 + "\n")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 서버가 안전하게 종료되었습니다.")
