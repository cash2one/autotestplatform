#!/usr/bin/env python
#-*- coding: utf-8 -*-
from common.logLib import *
from common.mysqlLib import *
from common.cmdLib import *
import time

import sys
reload(sys)
sys.setdefaultencoding('utf8')

#以GetItemByItem接口为例说明monitor流程
class autotestMonitor(object):
    def __init__(self):
        self.mysql=mysqlLib()
        monitor_test=self.mysql.query_test_management_monitor()
        #print monitor_test
        monitor_task=self.mysql.query_task_management({"id":monitor_test[0][1]})
        self.task_id=monitor_task[0][0]
        self.pjt_id=monitor_task[0][1]
        self.processtype=monitor_task[0][4]
        self.testtype=monitor_task[0][5]
        self.filepath=monitor_task[0][6]
        self.test_id=monitor_test[0][0]
        self.download_dir="./download/"+str(self.task_id)+"/"+str(self.test_id)+"/"
        self.status=0
        self.logstr=''

        self.script_dir="/home/users/yangjun03/webRoot/tornado/autotestPlatform/scripts/"
        self.benchmark_dir="/home/users/yangjun03/webRoot/tornado/autotestPlatform/benchmark/easyBenchmarkTesttool/"
        #初始化monitor信息
        print self.task_id,self.test_id,self.processtype,self.testtype,self.filepath,self.download_dir
        self.logstr+=u"检测到任务,开始执行....\n"
        self.mysql.update_test_management_log((self.logstr,self.test_id))
        time.sleep(10)

    def download(self):
        try:
            self.status=1
            self.mysql.update_test_management_status((self.status,self.test_id))

            if(self.processtype==1):
                cmdstr=u"wget -r -nH --preserve-permissions --level=0 --cut-dirs=8 "+self.filepath+" -P "+self.download_dir
                print cmdstr
                self.logstr+=u"\n开始下载版本....\n"
                self.logstr+=cmdstr
                self.mysql.update_test_management_log((self.logstr,self.test_id))
                time.sleep(10)
                status,output=cmd_execute(cmdstr)
                print status
                print output
                if(status == 0):
                    self.logstr+=u"\n版本下载成功....\n"
                    self.logstr+=output
                    self.mysql.update_test_management_log((self.logstr,self.test_id))
                    time.sleep(10)
                    pass
                else:
                    self.logstr+=u"\n版本下载失败....\n"
                    self.logstr+=output
                    self.mysql.update_test_management_log((self.logstr,self.test_id))
                    time.sleep(10)
                    self.status=2
                    self.mysql.update_test_management_status((self.status,self.test_id))
        except Exception as e:
            self.logstr+=u"\n版本下载失败....\n"
            self.logstr+=str(e)
            self.mysql.update_test_management_log((self.logstr,self.test_id))
            time.sleep(10)
            print(e)
            self.status=2
            self.mysql.update_test_management_status((self.status,self.test_id))


    def service_cfg(self):
        if(self.pjt_id == 1):
            try:
                cmdstr=u"cd "+self.download_dir+"output"+" && "+"tar -xzvf *.tar.gz"+" && "+\
                "cp -f ../../../../configue/upps.conf ../../../../configue/whitelist.conf upps/conf/"
                print cmdstr
                self.logstr+=u"\n配置文件修改....\n"
                self.logstr+=cmdstr
                self.mysql.update_test_management_log((self.logstr,self.test_id))
                time.sleep(10)
                status,output=cmd_execute(cmdstr)
                print status
                print output
                if(status == 0):
                    self.logstr+=u"\n配置文件修改成功....\n"
                    self.logstr+=output
                    self.mysql.update_test_management_log((self.logstr,self.test_id))
                    time.sleep(10)
                    pass
                else:
                    self.logstr+=u"\n配置文件修改失败....\n"
                    self.logstr+=output
                    self.mysql.update_test_management_log((self.logstr,self.test_id))
                    time.sleep(10)
                    time.sleep(10)
                    self.status=2
                    self.mysql.update_test_management_status((self.status,self.test_id))
            except Exception as e:
                self.logstr+=u"\n配置文件修改失败....\n"
                self.logstr+=str(e)
                self.mysql.update_test_management_log((self.logstr,self.test_id))
                time.sleep(10)
                print(e)
                self.status=2
                self.mysql.update_test_management_status((self.status,self.test_id))
        if(self.pjt_id == 5):
            try:
                cmdstr=u"cd "+self.download_dir+"output"+" && "+"tar -xzvf *.tar.gz"+" && "+\
                "cp -f ../../../../configue/ardb.conf ardb/conf/"
                print cmdstr
                self.logstr+=u"\n配置文件修改....\n"
                self.logstr+=cmdstr
                self.mysql.update_test_management_log((self.logstr,self.test_id))
                time.sleep(10)
                status,output=cmd_execute(cmdstr)
                print status
                print output
                if(status == 0):
                    self.logstr+=u"\n配置文件修改成功....\n"
                    self.logstr+=output
                    self.mysql.update_test_management_log((self.logstr,self.test_id))
                    time.sleep(10)
                    pass
                else:
                    self.logstr+=u"\n配置文件修改失败....\n"
                    self.logstr+=output
                    self.mysql.update_test_management_log((self.logstr,self.test_id))
                    time.sleep(10)
                    self.status=2
                    self.mysql.update_test_management_status((self.status,self.test_id))
            except Exception as e:
                self.logstr+=u"\n配置文件修改失败....\n"
                self.logstr+=str(e)
                self.mysql.update_test_management_log((self.logstr,self.test_id))
                time.sleep(10)
                print(e)
                self.status=2
                self.mysql.update_test_management_status((self.status,self.test_id))

    def service_start(self):
        if(self.pjt_id == 1):
            try:
                cmdstr=u"ps -ef | grep upps | grep -v grep | awk -F' '  '{ print $2 }' | xargs kill -9"
                print cmdstr
                self.logstr+=u"\n开始强制杀死原有服务进程服务进程....\n"
                self.logstr+=cmdstr
                self.mysql.update_test_management_log((self.logstr,self.test_id))
                time.sleep(10)
                status,output=cmd_execute(cmdstr)
                print status
                print output
                self.logstr+=output
                self.mysql.update_test_management_log((self.logstr,self.test_id))
                time.sleep(10)
            except:
                print("process not exist.")
            try:
                cmdstr="cd "+self.download_dir+"output/upps/bin"+" && "+"./start.sh"
                print cmdstr
                self.logstr+=u"\n开始启动服务进程....\n"
                self.logstr+=cmdstr
                self.mysql.update_test_management_log((self.logstr,self.test_id))
                time.sleep(10)
                status,output=cmd_execute(cmdstr)
                print status
                print output
                if(status == 0):
                    self.logstr+=u"\n服务进程启动成功....\n"
                    self.logstr+=output
                    self.mysql.update_test_management_log((self.logstr,self.test_id))
                    time.sleep(10)
                    pass
                else:
                    self.logstr+=u"\n服务进程启动失败....\n"
                    self.logstr+=output
                    self.mysql.update_test_management_log((self.logstr,self.test_id))
                    time.sleep(10)
                    self.status=2
                    self.mysql.update_test_management_status((self.status,self.test_id))
                    return
                time.sleep(5)
            except Exception as e:
                self.logstr+=u"\n服务进程启动失败....\n"
                self.logstr+=str(e)
                self.mysql.update_test_management_log((self.logstr,self.test_id))
                time.sleep(10)
                print(e)
                self.status=2
                self.mysql.update_test_management_status((self.status,self.test_id))
        if(self.pjt_id == 5):
            try:
                cmdstr=u"ps -ef | grep ardb | grep -v grep | awk -F' '  '{ print $2 }' | xargs kill -9"
                print cmdstr
                self.logstr+=u"\n开始强制杀死原有服务进程服务进程....\n"
                self.logstr+=cmdstr
                self.mysql.update_test_management_log((self.logstr,self.test_id))
                time.sleep(10)
                status,output=cmd_execute(cmdstr)
                print status
                print output
            except:
                print("process not exist.")
            try:
                cmdstr="cd "+self.download_dir+"output/ardb/bin"+" && "+"./ardb-server ../conf/ardb.conf"
                print cmdstr
                self.logstr+=u"\n开始启动服务进程....\n"
                self.logstr+=cmdstr
                self.mysql.update_test_management_log((self.logstr,self.test_id))
                time.sleep(10)
                status,output=cmd_execute(cmdstr)
                print status
                print output
                if(status == 0):
                    self.logstr+=u"\n服务进程启动成功....\n"
                    self.logstr+=output
                    self.mysql.update_test_management_log((self.logstr,self.test_id))
                    time.sleep(10)
                    pass
                else:
                    self.logstr+=u"\n服务进程启动失败....\n"
                    self.logstr+=output
                    self.mysql.update_test_management_log((self.logstr,self.test_id))
                    time.sleep(10)
                    self.status=2
                    self.mysql.update_test_management_status((self.status,self.test_id))
                    return
                time.sleep(5)
            except Exception as e:
                self.logstr+=u"\n服务进程启动失败....\n"
                self.logstr+=str(e)
                self.mysql.update_test_management_log((self.logstr,self.test_id))
                time.sleep(10)
                print(e)
                self.status=2
                self.mysql.update_test_management_status((self.status,self.test_id))

    def data_constructor(self):
        if(self.pjt_id == 1):
            try:
                cmdstr=u"cd "+self.script_dir+"DataConstructor/"+" && "+"python ItemsConstructor.py"
                print cmdstr
                self.logstr+=u"\n开始数据预置....\n"
                self.logstr+=cmdstr
                self.mysql.update_test_management_log((self.logstr,self.test_id))
                time.sleep(10)
                status,output=cmd_execute(cmdstr)
                print status
                print output
                if(status == 0):
                    self.logstr+=u"\n数据预置成功....\n"
                    self.logstr+=output
                    self.mysql.update_test_management_log((self.logstr,self.test_id))
                    time.sleep(10)
                    pass
                else:
                    self.logstr+=u"\n数据预置失败....\n"
                    self.logstr+=output
                    self.mysql.update_test_management_log((self.logstr,self.test_id))
                    time.sleep(10)
                    self.status=2
                    self.mysql.update_test_management_status((self.status,self.test_id))
            except Exception as e:
                self.logstr+=u"\n数据预置失败....\n"
                self.logstr+=str(e)
                self.mysql.update_test_management_log((self.logstr,self.test_id))
                time.sleep(10)
                print(e)
                self.status=2
                self.mysql.update_test_management_status((self.status,self.test_id))
        if(self.pjt_id == 5):
            pass

    def function_test(self):
        if(self.pjt_id == 1):
            try:
                time.sleep(5)
                cmdstr=u"cd "+self.script_dir+"InterfaceTest/json/"+" && "+"python UniTestCase.py "+str(self.test_id)
                print cmdstr
                self.logstr+=u"\n开始功能测试....\n"
                self.logstr+=cmdstr
                self.mysql.update_test_management_log((self.logstr,self.test_id))
                time.sleep(10)
                status,output=cmd_execute(cmdstr)
                print status
                print output
                if(status == 0):
                    self.logstr+=u"\n功能测试完毕....\n"
                    self.logstr+=output
                    self.mysql.update_test_management_log((self.logstr,self.test_id))
                    time.sleep(10)
                    '''self.status=3
                    self.mysql.update_test_management_status((self.status,self.test_id))
                    endtime=datetime.datetime.now().strftime("%y-%m-%d %H:%M:%S")
                    self.mysql.update_test_management_endtime((endtime,self.test_id))'''
                    pass
                else:
                    self.logstr+=u"\n功能测试异常....\n"
                    self.logstr+=output
                    self.mysql.update_test_management_log((self.logstr,self.test_id))
                    time.sleep(10)
                    self.status=2
                    self.mysql.update_test_management_status((self.status,self.test_id))
            except Exception as e:
                self.logstr+=u"\n功能测试异常....\n"
                self.logstr+=str(e)
                self.mysql.update_test_management_log((self.logstr,self.test_id))
                time.sleep(10)
                print(e)
                self.status=2
                self.mysql.update_test_management_status((self.status,self.test_id))
        if(self.pjt_id == 5):
            try:
                time.sleep(5)
                cmdstr=u"cd "+self.script_dir+"InterfaceTest/spatialIndex/"+" && "+"python spatialIndex.py "+str(self.test_id)
                print cmdstr
                self.logstr+=u"\n开始功能测试....\n"
                self.logstr+=cmdstr
                self.mysql.update_test_management_log((self.logstr,self.test_id))
                time.sleep(10)
                status,output=cmd_execute(cmdstr)
                print status
                print output
                if(status == 0):
                    self.logstr+=u"\n功能测试完毕....\n"
                    self.logstr+=output
                    self.mysql.update_test_management_log((self.logstr,self.test_id))
                    time.sleep(10)
                    self.status=3
                    self.mysql.update_test_management_status((self.status,self.test_id))
                    endtime=datetime.datetime.now().strftime("%y-%m-%d %H:%M:%S")
                    self.mysql.update_test_management_endtime((endtime,self.test_id))
                    pass
                else:
                    self.logstr+=u"\n功能测试异常....\n"
                    self.logstr+=output
                    self.mysql.update_test_management_log((self.logstr,self.test_id))
                    time.sleep(10)
                    self.status=2
                    self.mysql.update_test_management_status((self.status,self.test_id))
            except Exception as e:
                self.logstr+=u"\n功能测试异常....\n"
                self.logstr+=str(e)
                self.mysql.update_test_management_log((self.logstr,self.test_id))
                time.sleep(10)
                print(e)
                self.status=2
                self.mysql.update_test_management_status((self.status,self.test_id))

    def benchmark_test(self):
        if(self.pjt_id == 1):
            try:
                time.sleep(5)
                #cmdstr=u"cd "+self.benchmark_dir+" && "+"python easyBenchmarkTesttool.py -p 0 -c 500 -t 15 HTTP_POST_JSON_UserPreference.data"+\
                #" && "+"python easyBenchmarkStat.py "+str(self.test_id)
                cmdstr=u"cd "+self.benchmark_dir+" && "+"python easyBenchmarkStat.py "+str(self.test_id)
                print cmdstr
                status,output=cmd_execute(cmdstr)
                print status
                print output
                if(status == 0):
                    self.status=3
                    self.mysql.update_test_management_status((self.status,self.test_id))
                    endtime=datetime.datetime.now().strftime("%y-%m-%d %H:%M:%S")
                    self.mysql.update_test_management_endtime((endtime,self.test_id))
                else:
                    self.status=2
                    self.mysql.update_test_management_status((self.status,self.test_id))
            except Exception as e:
                print(e)
                self.status=2
                self.mysql.update_test_management_status((self.status,self.test_id))

if __name__ == "__main__":
    while(1):
        try:
            print("monitor starting...")
            monitor=autotestMonitor()
        except Exception as e:
            print(e)
        else:
            monitor.download()
            monitor.service_cfg()
            monitor.service_start()
            monitor.data_constructor()
            monitor.function_test()

            '''monitor.benchmark_test()'''
        finally:
            print("no task monitored,monitoring continues after 5 seconds...\n")
            time.sleep(5)
    '''monitor=autotestMonitor()
    monitor.benchmark_test()
    mysql=mysqlLib()
    mysql.query_benchmark_test({"id":1})'''

