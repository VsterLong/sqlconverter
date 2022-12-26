# sqlconverter
一个可以将MyBatis日志转为为SQL的小工具。

# 使用方法
1. 选中日志中包含Preparing和Parameters的部分进行复制
    ```sql
    ==>  Preparing: select RES.* from ACT_RU_JOB RES LEFT OUTER JOIN ACT_RU_EXECUTION PI ON PI.ID_ = RES.PROCESS_INSTANCE_ID_ where (RES.RETRIES_ > 0) and (RES.DUEDATE_ is null or RES.DUEDATE_ <= ?) and (RES.LOCK_OWNER_ is null or RES.LOCK_EXP_TIME_ <= ?) and ( (RES.EXECUTION_ID_ is null) or (PI.SUSPENSION_STATE_ = 1) ) LIMIT ? OFFSET ?
    ==> Parameters: 2022-12-19 15:08:53.088(Timestamp), 2022-12-19 15:08:53.088(Timestamp), 1(Integer), 0(Integer)
    ```
2. 调出命令 `SQLConverter: Convert MyBatis Log To SQL` 执行，执行完成后转换好的SQL语句已经复制到剪切板中。
3. 使用 Ctrl + V 在任何编辑器中粘贴使用。
    ```sql
    select RES.* from ACT_RU_JOB RES LEFT OUTER JOIN ACT_RU_EXECUTION PI ON PI.ID_ = RES.PROCESS_INSTANCE_ID_ where (RES.RETRIES_ > 0) and (RES.DUEDATE_ is null or RES.DUEDATE_ <= "2022-12-19 15:08:53.088") and (RES.LOCK_OWNER_ is null or RES.LOCK_EXP_TIME_ <= "2022-12-19 15:08:53.088") and ( (RES.EXECUTION_ID_ is null) or (PI.SUSPENSION_STATE_ = 1) ) LIMIT 1 OFFSET 0
    ```