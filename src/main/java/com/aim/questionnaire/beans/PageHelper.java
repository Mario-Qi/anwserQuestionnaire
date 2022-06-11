package com.aim.questionnaire.beans;

import java.util.ArrayList;
import java.util.List;

public class PageHelper {
    private List rows = new ArrayList<>();
    private int total;

    public PageHelper(List rows, int total) {
        this.rows = rows;
        this.total = total;
    }

    public PageHelper() {
    }

    public List getRows() {
        return rows;
    }

    public void setRows(List rows) {
        this.rows = rows;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }
}
